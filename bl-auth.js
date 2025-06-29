require('dotenv').config({ quiet: true });

try {
  const readline = require("node:readline");
  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);
  process.stdin.on('keypress', async function (str, key) {
    if (key && key.ctrl && key.name === "c") {
      process.exit();
    }
    else if (key && (key.name == 'enter' || key.name == 'return')) {
      await send_bl_auth();
    }
  });
}
catch {
  console.error("Error! keypressを登録できませんでした。")
}

const cron = require('node-cron');
cron.schedule('0 0 0 * * *', async () => {
  await send_bl_auth();
  console.log("0時(中国時間)まで待機しています。");
}, {
  timezone: 'Asia/Shanghai',
});

console.log("0時(中国時間)まで待機しています。\nEnterキーを押すことで、手動でブートローダーアンロック申請の通信を送信できます。");

// bl_auth(process.env.cookie);

async function send_bl_auth() {
  console.log("ブートローダーアンロック申請を送信しています. . . ");
  const response = await bl_auth(process.env.cookie);
  console.log("申請リクエストを送信しました！ブートローダーアンロック権限を取得できたかどうかをXiaomi Communityアプリから確認してみてください。\nレスポンスボディ: " + await response.text());
}

async function bl_auth(cookie) {
  return await fetch("https://sgp-api.buy.mi.com/bbs/api/global/apply/bl-auth", { method: "POST", headers: { Cookie: cookie, "Content-Type": "application/json; charset=utf-8", "Accept-Encoding": "gzip, deflate, br", "User-Agent": "okhttp/4.12.0" }, body: '{"is_retry":true}' });
}
