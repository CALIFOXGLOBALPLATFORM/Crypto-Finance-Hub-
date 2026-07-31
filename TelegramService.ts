// src/services/telegramService.ts
import axios from 'axios';

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

async function sendTelegramMessage(message: string) {
  await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
    chat_id: CHAT_ID,
    text: message,
  });
}

export async function notifyNewUser(email: string) {
  await sendTelegramMessage(`🚀 New user registered: ${email}`);
}

export async function notifyDeposit(userEmail: string, amount: number, currency: string) {
  await sendTelegramMessage(`💰 Deposit: ${userEmail} deposited ${amount} ${currency}`);
}

export async function notifyWithdrawal(userEmail: string, amount: number, currency: string) {
  await sendTelegramMessage(`📤 Withdrawal: ${userEmail} withdrew ${amount} ${currency}`);
}

export async function notifyBalanceAdjustment(adminEmail: string, userEmail: string, amount: number, reason: string) {
  await sendTelegramMessage(`⚖️ Balance Adjustment by ${adminEmail} for ${userEmail}: ${amount}. Reason: ${reason}`);
}