"""
Telegram Bot Namunasi (aiogram 3.x)
Ushbu skript foydalanuvchiga Mini App ochish tugmasini taqdim etadi.

O'rnatish:
pip install aiogram

Ishga tushirish:
python bot_example.py
"""

import asyncio
import logging
from aiogram import Bot, Dispatcher, types
from aiogram.filters import CommandStart
from aiogram.types import WebAppInfo, InlineKeyboardMarkup, InlineKeyboardButton, MenuButtonWebApp

# O'zingizning bot tokeningizni kiriting (@BotFather dan olinadi)
BOT_TOKEN = "YOUR_BOT_TOKEN_HERE"

# Mini App manzili (Vercel, ngrok yoki boshqa HTTPS havola)
MINI_APP_URL = "https://your-mini-app-domain.vercel.app"

logging.basicConfig(level=logging.INFO)
dp = Dispatcher()

@dp.message(CommandStart())
async def start_handler(message: types.Message, bot: Bot):
    # Inline tugma
    keyboard = InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(
                    text="📊 Marketing & Budjet Auditini Boshlash",
                    web_app=WebAppInfo(url=MINI_APP_URL)
                )
            ]
        ]
    )

    # Pastki menyu tugmasini (MenuButtonWebApp) sozlash
    await bot.set_chat_menu_button(
        chat_id=message.chat.id,
        menu_button=MenuButtonWebApp(
            text="📊 Moliya Auditi",
            web_app=WebAppInfo(url=MINI_APP_URL)
        )
    )

    await message.answer(
        f"Assalomu alaykum, {message.from_user.first_name}! 👋\n\n"
        "Biznesingiz sotuv tizimi, CRM holati va reklama byudjetini professional darajada "
        "audit qilish uchun quyidagi tugmani bosing:",
        reply_markup=keyboard
    )

# Mini App dan sendData orqali yuborilgan natijani qabul qilish
@dp.message(lambda msg: msg.web_app_data is not None)
async def web_app_data_handler(message: types.Message):
    audit_result = message.web_app_data.data
    await message.answer(
        f"✅ Sizning auditingiz natijasi qabul qilindi:\n\n{audit_result}"
    )

async def main():
    if BOT_TOKEN == "YOUR_BOT_TOKEN_HERE":
        print("⚠️ Iltimos, bot_example.py fayliga o'zingizning Telegram Bot Tokeningizni kiriting!")
        return
    bot = Bot(token=BOT_TOKEN)
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())
