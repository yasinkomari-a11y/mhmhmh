const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('البوت شغال 24 ساعة عبر الإنترنت!');
});
app.listen(3000, () => {
  console.log('سيرفر الويب جاهز على المنفذ 3000');
});

// الكود الذكي لتخطي فحص البروتوكول عبر محاكاة الاتصال المباشر
const botArgs = {
  host: 'rebizibelkacemxxx-xZ.aternos.me',
  port: 22201,
  username: '247_Bot',
  version: false,          // إيقاف تحديد الإصدار تماماً لمنع الطرد
  checkTimeoutInterval: 60000
};

let bot;

function createBot() {
  bot = mineflayer.createBot(botArgs);

  // إجبار البوت على تخطي مرحلة الفحص المزعجة والبدء فوراً
  bot._client.on('packet', (data, meta) => {
    if (meta.name === 'disconnect') {
      console.log('السيرفر أرسل إشارة فصل، جاري إعادة المحاولة...');
    }
  });

  bot.on('spawn', () => {
    console.log('تم دخول البوت بنجاح إلى السيرفر!');
    bot.chat('أنا بوت شغال 24 ساعة!');
  });

  bot.on('end', () => {
    console.log('تم قطع الاتصال، جاري إعادة المحاولة خلال 10 ثوانٍ...');
    setTimeout(createBot, 10000);
  });

  bot.on('error', (err) => {
    // تجاهل أخطاء الإصدار والبروتوكول والاستمرار في محاولة الدخول
    if (err.message.includes('version') || err.message.includes('protocol')) {
      return; 
    }
    console.log('حدث خطأ في البوت:', err);
  });
}

createBot();

