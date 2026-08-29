import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json",
};

const json = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: corsHeaders });

const hex = (bytes: ArrayBuffer) =>
  Array.from(new Uint8Array(bytes)).map((b) => b.toString(16).padStart(2, "0")).join("");

async function hmacSha256(key: Uint8Array, message: string): Promise<ArrayBuffer> {
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    key,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  return crypto.subtle.sign("HMAC", cryptoKey, new TextEncoder().encode(message));
}

function constantTimeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i += 1) result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return result === 0;
}

async function verifyTelegramInitData(initData: string, botToken: string) {
  const params = new URLSearchParams(initData);
  const receivedHash = params.get("hash");
  const authDate = Number(params.get("auth_date") || 0);
  if (!receivedHash || !authDate) throw new Error("invalid_telegram_init_data");
  if (Math.abs(Math.floor(Date.now() / 1000) - authDate) > 86400) throw new Error("telegram_init_data_expired");

  params.delete("hash");
  const dataCheckString = [...params.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join("\n");
  const secretKey = new Uint8Array(await hmacSha256(new TextEncoder().encode("WebAppData"), botToken));
  const expectedHash = hex(await hmacSha256(secretKey, dataCheckString));
  if (!constantTimeEqual(expectedHash, receivedHash)) throw new Error("telegram_init_data_signature_invalid");

  const rawUser = params.get("user");
  if (!rawUser) throw new Error("telegram_user_missing");
  const user = JSON.parse(rawUser);
  if (!user?.id) throw new Error("telegram_user_invalid");
  return user;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, 405);

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY") || Deno.env.get("SUPABASE_PUBLISHABLE_KEY");
    const botToken = Deno.env.get("TELEGRAM_BOT_TOKEN");
    if (!supabaseUrl || !serviceRoleKey || !anonKey || !botToken) return json({ error: "function_not_configured" }, 503);

    const authorization = req.headers.get("Authorization");
    if (!authorization?.startsWith("Bearer ")) return json({ error: "missing_authorization" }, 401);
    const userClient = createClient(supabaseUrl, anonKey, { global: { headers: { Authorization: authorization } } });
    const { data: currentData, error: currentError } = await userClient.auth.getUser();
    if (currentError || !currentData.user) return json({ error: "invalid_supabase_session" }, 401);

    const body = await req.json();
    const telegramUser = await verifyTelegramInitData(String(body?.init_data || ""), botToken);
    const telegramId = String(telegramUser.id);
    const admin = createClient(supabaseUrl, serviceRoleKey, { auth: { autoRefreshToken: false, persistSession: false } });

    let { data: identity, error: identityError } = await admin
      .from("telegram_identities")
      .select("user_id")
      .eq("telegram_user_id", telegramId)
      .maybeSingle();
    if (identityError) throw identityError;

    const canonicalEmail = `telegram_${telegramId}@users.tayanch.local`;
    let targetUserId = identity?.user_id || null;

    if (!targetUserId) {
      const { data: created, error: createError } = await admin.auth.admin.createUser({
        email: canonicalEmail,
        email_confirm: true,
        user_metadata: {
          telegram_id: telegramId,
          telegram_username: telegramUser.username || null,
          first_name: telegramUser.first_name || null,
          last_name: telegramUser.last_name || null,
        },
      });
      if (createError) throw createError;
      targetUserId = created.user?.id || null;
      if (!targetUserId) throw new Error("canonical_supabase_user_missing");
    }

    const { error: upsertError } = await admin.from("telegram_identities").upsert({
      telegram_user_id: telegramId,
      user_id: targetUserId,
      username: telegramUser.username || null,
      first_name: telegramUser.first_name || null,
      last_name: telegramUser.last_name || null,
      photo_url: telegramUser.photo_url || null,
      updated_at: new Date().toISOString(),
    }, { onConflict: "telegram_user_id" });
    if (upsertError) throw upsertError;

    if (targetUserId !== currentData.user.id) {
      const { data: sourceProfile } = await admin
        .from("profiles")
        .select("full_name,phone,address,education_type,xp_total,combo,streak,last_active_date,unlocked_badges")
        .eq("id", currentData.user.id)
        .maybeSingle();
      if (sourceProfile) {
        const { data: targetProfile } = await admin
          .from("profiles")
          .select("id,address,education_type,xp_total,combo,streak,last_active_date,unlocked_badges")
          .eq("id", targetUserId)
          .maybeSingle();
        if (!targetProfile || (!targetProfile.address && !targetProfile.education_type)) {
          const { error: profileMoveError } = await admin.from("profiles").upsert({
            id: targetUserId,
            full_name: sourceProfile.full_name || null,
            phone: sourceProfile.phone || null,
            address: sourceProfile.address || null,
            education_type: sourceProfile.education_type || null,
            xp_total: sourceProfile.xp_total ?? 250,
            combo: sourceProfile.combo ?? 3,
            streak: sourceProfile.streak ?? 3,
            last_active_date: sourceProfile.last_active_date || null,
            unlocked_badges: sourceProfile.unlocked_badges || ["vocab_champion"],
            updated_at: new Date().toISOString(),
          });
          if (profileMoveError) throw profileMoveError;
        }
      }
    }

    if (targetUserId === currentData.user.id) {
      return json({ ok: true, linked: true, user_id: targetUserId });
    }

    const { data: linkData, error: linkError } = await admin.auth.admin.generateLink({
      type: "magiclink",
      email: canonicalEmail,
    });
    if (linkError) throw linkError;
    const tokenHash = linkData.properties?.hashed_token;
    if (!tokenHash) throw new Error("session_token_missing");

    return json({ ok: true, linked: true, requires_session: true, token_hash: tokenHash, user_id: targetUserId });
  } catch (error) {
    console.error("[link-telegram-account]", error);
    return json({ error: error instanceof Error ? error.message : "telegram_link_failed" }, 400);
  }
});
