# -*- coding: utf-8 -*-
"""
==========================================================================
Tayanch Platformasi — Live Telegram Sales & AI Onboarding Bot (@Tayanch_sales_bot)
==========================================================================
"""

import urllib.request
import urllib.parse
import json
import time
import sys
import logging

TOKEN = "8961832617:AAELgbWLCXW5i8pBF4ZdXnKqjzT70Zfewys"
API_URL = f"https://api.telegram.org/bot{TOKEN}/"

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

def send_request(method, params=None):
    url = API_URL + method
    try:
        data = urllib.parse.urlencode(params).encode('utf-8') if params else None
        req = urllib.request.Request(url, data=data)
        with urllib.request.urlopen(req, timeout=10) as response:
            return json.loads(response.read().decode('utf-8'))
    except Exception as e:
        logging.error(f"Error calling {method}: {e}")
        return None

def send_message(chat_id, text, reply_markup=None):
    params = {
        'chat_id': chat_id,
        'text': text,
        'parse_mode': 'Markdown'
    }
    if reply_markup:
        params['reply_markup'] = json.dumps(reply_markup)
    return send_request('sendMessage', params)

def answer_callback_query(callback_query_id, text=""):
    params = {'callback_query_id': callback_query_id, 'text': text}
    return send_request('answerCallbackQuery', params)

# --- KEYBOARDS & MESSAGES ---

MAIN_KEYBOARD = {
    'inline_keyboard': [
        [
            {'text': '📚 31 ta Kurslar & Narxlar', 'callback_data': 'cat_all'},
            {'text': '⚡ AI Prompt Playground', 'callback_data': 'ai_playground'}
        ],
        [
            {'text': '🗣️ Speaking Roleplay', 'callback_data': 'roleplay_info'},
            {'text': '✍️ IELTS Essay Score Checker', 'callback_data': 'essay_info'}
        ],
        [
            {'text': '🌐 Veb-saytga Kirish (Hub)', 'url': 'https://javohirqaxramonov36-web.github.io/tayanch-landing-page/'},
            {'text': '📞 Maslahat & Ariza', 'callback_data': 'apply_lead'}
        ]
    ]
}

WELCOME_TEXT = """
🤖 *Tayanch Educational Platform Botiga Xush Kelibsiz!* 🎮✨

Siz bu yerda zamonaviy **Sun'iy Intelekt (AI)**, **IELTS Band 7.5+**, **Digital SAT 800** hamda **AQSh Grantlari** bo'yicha amaliy va gamifikatsiyalangan kurslarni topasiz.

🔥 *Gamifikatsiya Imkoniyatlari:*
🔊 Native Web Speech audio talaffuzi;
⚡ ChatGPT & Claude jonli prompt simulyatori;
🔥 +50 XP va Combo Streak yutuq nishonlari;
💬 Kafe va Aeroportda AI bilan Speaking Roleplay!

👇 *Kerakli bo'limni tanlang:*
"""

CATALOG_TEXT = """
📚 *TAYANCH 30 TA KURSLAR KATALOGI VA NARXLARI*

🤖 *SUN'IY INTELEKT (AI) KURSLARI:*
• AI Tools for Academic Research & Writing — `299,000 UZS`
• ChatGPT & Advanced Prompt Engineering — `249,000 UZS`
• Python + AI Foundations — `349,000 UZS`
• Midjourney & AI Visual Content — `199,000 UZS`

🇬🇧 *IELTS & INGLIZ TILI KURSLARI:*
• IELTS Writing Task 2 Masterclass (Band 7.5+) — `349,000 UZS`
• IELTS Speaking Confidence & Accent Booster — `249,000 UZS`
• IELTS Intensive 30-Day Bootcamp — `499,000 UZS`
• General English B1 to B2 Accelerator — `299,000 UZS`

🎓 *ADMISSION & SAT KURSLARI:*
• Digital SAT Math Mastery (800 Score Strategy) — `399,000 UZS`
• Full-Ride Scholarship Blueprint — `399,000 UZS`
• Common App & Financial Aid (CSS Profile) — `299,000 UZS`

👑 *Ochiq Platforma Rejimi:* Barcha foydalanuvchilar uchun darslar va amaliyotlar 100% ochiq!
"""

AI_PLAYGROUND_TEXT = """
⚡ *LIVE AI PROMPT PLAYGROUND SIMULYATORI*

ChatGPT va Claude uchun tayyor promptlar andozasi bilan tanishing va amalda sinang:

📌 *IELTS Essay Prompt:*
`Act as an IELTS Band 9 Writing Tutor. Analyze the prompt and generate outline & collocations.`

📌 *Vocab Builder Prompt:*
`Generate 5 C1-level academic collocations for technology with Uzbek translations.`

💻 *Jonli simulyatorni veb-saytda run qiling:*
https://javohirqaxramonov36-web.github.io/tayanch-landing-page/courses.html
"""

ROLEPLAY_TEXT = """
🗣️ *SPEAKING ROLEPLAY CHATBOT SIMULYATORI*

Real muloqot ssenariylarida AI sherigingiz bilan suhbatlashing:
• ☕ **Kafe Buyurtmasi (Cafe Order)**
• ✈️ **Aeroport Tekshiruvi (Airport Security)**
• 💼 **Universitet & Ish Intervyusi**

💬 *Veb-saytda bevosita ovozli muloqot qiling:*
https://javohirqaxramonov36-web.github.io/tayanch-landing-page/general-english-beginner.html
"""

ESSAY_TEXT = """
✍️ *INSTANT IELTS ESSAY SCORE CHECKER*

Inshoingizni kiriting va 4 ta IELTS mezonlari bo'yicha onlayn diagnostika oling:
1. Task Response
2. Coherence & Cohesion
3. Lexical Resource
4. Grammatical Range & Accuracy

📊 *Inshoingizni tekshirish:*
https://javohirqaxramonov36-web.github.io/tayanch-landing-page/general-english-beginner.html
"""

APPLY_TEXT = """
📞 *TAYANCH KURSLARIGA ARIZA QOLDIRISH*

Ta'lim menejerimiz siz bilan zudlik bilan bog'lanishi uchun ismingiz va telefon raqamingizni yozib yuboring (masalan: *Jasur +998901234567*).

Yoki rasmiy kanalamizga o'ting: `@tayanch_go`
"""

def handle_update(update):
    if 'message' in update:
        msg = update['message']
        chat_id = msg['chat']['id']
        text = msg.get('text', '')

        if text.startswith('/start'):
            send_message(chat_id, WELCOME_TEXT, MAIN_KEYBOARD)
        elif '+' in text or any(char.isdigit() for char in text):
            send_message(chat_id, "✅ *Arizangiz qabul qilindi!* Menejerimiz tez orada siz bilan bog'lanadi.\n\n🌐 Veb-saytimiz: https://javohirqaxramonov36-web.github.io/tayanch-landing-page/", MAIN_KEYBOARD)
        else:
            send_message(chat_id, f"Sizning xabaringiz: *{text}*\n\nNimanidir qidiryapsizmi? Quyidagi menyudan foydalaning:", MAIN_KEYBOARD)

    elif 'callback_query' in update:
        cb = update['callback_query']
        cb_id = cb['id']
        chat_id = cb['message']['chat']['id']
        data = cb.get('data', '')

        answer_callback_query(cb_id)

        if data == 'cat_all':
            send_message(chat_id, CATALOG_TEXT, MAIN_KEYBOARD)
        elif data == 'ai_playground':
            send_message(chat_id, AI_PLAYGROUND_TEXT, MAIN_KEYBOARD)
        elif data == 'roleplay_info':
            send_message(chat_id, ROLEPLAY_TEXT, MAIN_KEYBOARD)
        elif data == 'essay_info':
            send_message(chat_id, ESSAY_TEXT, MAIN_KEYBOARD)
        elif data == 'apply_lead':
            send_message(chat_id, APPLY_TEXT, MAIN_KEYBOARD)

def main():
    logging.info("Starting Tayanch Telegram Sales Bot Polling...")
    offset = 0
    while True:
        try:
            updates = send_request('getUpdates', {'offset': offset, 'timeout': 20})
            if updates and updates.get('ok'):
                for update in updates['result']:
                    offset = update['update_id'] + 1
                    handle_update(update)
            time.sleep(0.5)
        except Exception as e:
            logging.error(f"Polling loop error: {e}")
            time.sleep(3)

if __name__ == '__main__':
    main()
