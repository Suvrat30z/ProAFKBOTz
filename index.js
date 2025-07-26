const mineflayer = require('mineflayer');
const express = require('express');
require('dotenv').config();

function createBot() {
  const bot = mineflayer.createBot({
    host: process.env.HOST,
    port: parseInt(process.env.PORT),
    username: process.env.USERNAME,
    version: process.env.VERSION || false
  });

  bot.on('spawn', () => {
    console.log('Bot spawned!');
    bot.setControlState('jump', true);
    setInterval(() => bot.chat('Still online!'), 60_000);
  });

  bot.on('end', () => {
    console.log('Disconnected — reconnecting...');
    setTimeout(createBot, 5_000);
  });

  bot.on('error', console.log);
}

createBot();

const app = express();
app.get('/', (_req, res) => res.send('ProAFKBOT running'));
app.listen(process.env.PORT || 3000);
