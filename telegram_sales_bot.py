# -*- coding: utf-8 -*-
"""
==========================================================================
Tayanch Platformasi — Telegram Automated Sales & Placement Bot Engine
==========================================================================
Ushbu skript Telegram bot API (python-telegram-bot / aiogram) orqali
foydalanuvchilar bilan avtomatik muloqot qilish, kurslar sotuvini amalga oshirish,
bepul AI placement test o'tkazish va arizalarni yig'ish uchun mo'ljallangan.
"""

import sys
import json
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("TayanchSalesBot")

COURSES_CATALOG = [
    {"id": 1, "title": "Practical AI for Daily Productivity", "price": "199,000 UZS", "category": "AI"},
    {"id": 2, "title": "ChatGPT & Advanced Prompt Engineering", "price": "249,000 UZS", "category": "AI"},
    {"id": 11, "title": "IELTS Writing Task 2 Masterclass (Band 7.5+)", "price": "349,000 UZS", "category": "IELTS"},
    {"id": 15, "title": "IELTS Intensive 30-Day Sprint (Bootcamp)", "price": "499,000 UZS", "category": "IELTS"},
    {"id": 22, "title": "Digital SAT Math Mastery (800 Score Strategy)", "price": "399,000 UZS", "category": "SAT"},
    {"id": 25, "title": "Full-Ride Scholarship Application Blueprint", "price": "399,000 UZS", "category": "Grant"}
]

WELCOME_MESSAGE = """
🤖 *Tayanch Educational Platform Botiga Xush Kelibsiz!*

Bu yerda siz:
• Sun'iy Intelekt (AI) va ChatGPT imkoniyatlarini o'rganishingiz;
• IELTS Band 7.5+ va Digital SAT 800 natijalariga tayyorgarlik ko'rishingiz;
• Interaktiv o'yin texnologiyasi (Gamification) orqali bilimlaringizni oshirishingiz mumkin.

👇 *Kerakli bo'limni tanlang:*
"""

def generate_catalog_message():
    msg = "📚 *TAYANCH KURSLAR KATALOGI VA NARXLAR*\n\n"
    for item in COURSES_CATALOG:
        msg += f"• *{item['title']}*\n  💰 Narxi: `{item['price']}` | Soha: {item['category']}\n\n"
    msg += "🔗 *Veb-sayt:* https://javohirqaxramonov36-web.github.io/tayanch-landing-page/courses.html\n"
    msg += "👑 *VIP Sinov Account:* `javohirqaxramonov36@gmail.com`"
    return msg

def generate_lead_submission(name, phone, course_name, telegram_user):
    lead_data = {
        "name": name,
        "phone": phone,
        "course": course_name,
        "telegram": telegram_user
    }
    logger.info(f"Yangi ariza qabul qilindi: {lead_data}")
    return f"✅ Rahmat {name}! Arizangiz qabul qilindi. Tez orada menejerimiz bog'lanadi."

if __name__ == "__main__":
    print("=== TAYANCH TELEGRAM SALES BOT ENGINE ===")
    print(WELCOME_MESSAGE)
    print(generate_catalog_message())
