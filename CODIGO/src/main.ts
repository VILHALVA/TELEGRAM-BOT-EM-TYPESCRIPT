import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';

dotenv.config();

const BOT_TOKEN = process.env.BOT_TOKEN;

if (!BOT_TOKEN) {
    console.error("Por favor, defina o token do bot no arquivo .env");
    process.exit(1);
}

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `Olá, ${msg.from?.first_name}! Bem-vindo ao bot. Aqui estão os comandos disponíveis:\n\n` +
        `/start - Ver a saudação e os comandos disponíveis\n` +
        `/help - Exibe uma mensagem de ajuda\n` +
        `/about - Informações sobre o bot`);
});

bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `Para usar o bot, você pode utilizar os seguintes comandos:\n` +
        `/start - Exibe uma saudação e lista de comandos\n` +
        `/help - Exibe esta mensagem de ajuda\n` +
        `/about - Informações sobre o bot`);
});

bot.onText(/\/about/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `Este é um bot básico usando a API do Telegram.`);
});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    if (!msg.text?.startsWith('/')) {
        bot.sendMessage(chatId, `Comando não reconhecido. Use /help para ver os comandos disponíveis.`);
    }
});
