<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9">
<xsl:template match="/">
<html lang="uz">
<head>
  <meta charset="UTF-8" />
  <title>Tayanch Platformasi — Visual XML Sitemap</title>
  <style>
    body { font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif; background: #0e0f15; color: #f8fafc; padding: 2.5rem; line-height: 1.6; }
    .container { max-width: 1000px; margin: 0 auto; }
    .header-box { background: rgba(18, 22, 34, 0.8); border: 1px solid rgba(255, 255, 255, 0.1); padding: 2rem; border-radius: 16px; backdrop-filter: blur(10px); }
    h1 { color: #00f2fe; margin-top: 0; font-size: 2rem; font-weight: 800; display: flex; align-items: center; gap: 10px; }
    p { color: #94a3b8; font-size: 1.05rem; }
    table { width: 100%; border-collapse: collapse; margin-top: 2rem; background: rgba(18, 22, 34, 0.6); border-radius: 16px; overflow: hidden; border: 1px solid rgba(255, 255, 255, 0.08); }
    th { background: #161922; color: #a855f7; font-weight: 700; padding: 1.25rem 1rem; text-align: left; text-transform: uppercase; font-size: 0.85rem; letter-spacing: 1px; }
    td { padding: 1.1rem 1rem; border-bottom: 1px solid rgba(255, 255, 255, 0.05); }
    tr:hover { background: rgba(255, 255, 255, 0.03); }
    a { color: #00f2fe; text-decoration: none; font-weight: 600; transition: color 0.2s; }
    a:hover { color: #a855f7; text-decoration: underline; }
    .badge { background: rgba(0, 242, 254, 0.15); color: #00f2fe; padding: 4px 10px; border-radius: 8px; font-size: 0.8rem; font-weight: 600; display: inline-block; }
    .priority { color: #fbbf24; font-weight: 700; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header-box">
      <h1>Tayanch XML Sitemap</h1>
      <p>Bu Tayanch platformasining Google, Yandex va foydalanuvchilar uchun yaratilgan rasmiy visual XML sahifalar xaritasidir.</p>
    </div>
    <table>
      <thead>
        <tr>
          <th>Sahifa Manzili (URL)</th>
          <th>So'nggi Yangilanish</th>
          <th>Chastotasi</th>
          <th>Prioritet</th>
        </tr>
      </thead>
      <tbody>
        <xsl:for-each select="s:urlset/s:url">
        <tr>
          <td><a href="{s:loc}"><xsl:value-of select="s:loc"/></a></td>
          <td><xsl:value-of select="s:lastmod"/></td>
          <td><span class="badge"><xsl:value-of select="s:changefreq"/></span></td>
          <td class="priority"><xsl:value-of select="s:priority"/></td>
        </tr>
        </xsl:for-each>
      </tbody>
    </table>
  </div>
</body>
</html>
</xsl:template>
</xsl:stylesheet>
