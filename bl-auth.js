require('dotenv').config({ quiet: true });

const cron = require('node-cron');
cron.schedule('0 0 0 * * *', async () => {
  console.log("ブートローダーアンロック申請を送信しています. . . ");
  const response = await bl_auth(process.env.cookie);
  console.log("申請リクエストを送信しました！Xiaomi Communityアプリを確認してみてください。\nレスポンスボディ: " + await response.text());
  console.log("0時(中国時間)まで待機しています。");
}, {
  timezone: 'Asia/Shanghai',
});

console.log("0時(中国時間)まで待機しています。");

// bl_auth(process.env.cookie);

async function bl_auth(cookie) {
  return await fetch("https://sgp-api.buy.mi.com/bbs/api/global/apply/bl-auth", { method: "POST", headers: { Cookie: cookie, "Content-Type": "application/json; charset=utf-8", "Accept-Encoding": "gzip, deflate, br", "User-Agent": "okhttp/4.12.0" }, body: '{"is_retry":true}' });
}
