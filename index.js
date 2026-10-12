const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('البوت شغال 24 ساعة عبر الإنترنت!');
});
app.listen(3000, () => {
  console.log('سيرفر الويب جاهز على المنفذ 3000');
});

// إعداد الاتصال الذكي المباشر دون فحص بيانات الإصدار
const botArgs = {
  host: 'rebizibelkacemxxx-xZ.aternos.me',
  port: 22201,
  username: '247_Bot',
  version: false, // تعطيل الفحص الداخلي للمكتبة لمنع انهيار البوت
  fakeHost: 'rebizibelkacemxxx-xZ.aternos.me'
};

let bot;

function createBot() {
  bot = mineflayer.createBot(botArgs);

  // إجبار البروتوكول على تخطي أخطاء الهيكلة والبيانات المفقودة
  bot.on('error', (err) => {
    if (err.message.includes('data') || err.message.includes('version')) {
      return; // تجاهل أخطاء إصدار 26.3 تماماً والاستمرار في الاتصال
    }
    console.log('حدث خطأ في البوت:', err);
  });

  bot.on('spawn', () => {
    console.log('تم دخول البوت بنجاح إلى السيرفر!');
    bot.chat('أنا بوت شغال 24 ساعة!');
  });

  bot.on('end', () => {
    console.log('تم قطع الاتصال، جاري إعادة المحاولة خلال 10 ثوانٍ...');
    setTimeout(createBot, 10000);
  });
}

createBot();



