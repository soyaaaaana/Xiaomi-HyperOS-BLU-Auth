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
  console.error("Error! keypressを登録できませんでした。");
}

const cron = require('node-cron');
const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

cron.schedule("59 59 23 * * *", async () => {
  const count = 5; // 試行回数
  let execute_count = 0;
  let success = false;
  while (execute_count < count && !success) {
    execute_count++;
    if (await send_bl_auth()) {
      success = true;
    }
    else {
      if (execute_count !== count) {
        await sleep(250);
      }
    }
  }
  console.log("0時(中国時間)まで待機しています。");
}, {
  timezone: 'Asia/Shanghai',
});

// cron.schedule("0 0 0 * * *", async () => {
//   await send_bl_auth();
// }, {
//   timezone: 'Asia/Shanghai',
// });

// cron.schedule("1 0 0 * * *", async () => {
//   await send_bl_auth();
//   console.log("0時(中国時間)まで待機しています。");
// }, {
//   timezone: 'Asia/Shanghai',
// });

console.log("0時(中国時間)まで待機しています。\n時間を同期しておくことをおすすめします。\nEnterキーを押すことで、手動でブートローダーアンロック申請の通信を送信できます。");

async function send_bl_auth() {
  console.log("ブートローダーアンロック申請を送信しています. . . ");
  const response = await bl_auth(process.env.cookie);
  // console.log("申請リクエストを送信しました！ブートローダーアンロック権限を取得できたかどうかをXiaomi Communityアプリから確認してみてください。\nレスポンスボディ: " + await response.text());
  const response_text = await response.text();
  try {
    const response_json = JSON.parse(response_text);
    if (response_json?.code === 0) {
      if (response_json?.data?.apply_result === 1) {
        const date = new Date(response_json?.data?.deadline_format);
        const deadline_text = date ? `有効期限は${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")}(中国時間)です。` : "";
        console.log("申請リクエストに成功しました！ブートローダーのアンロック権限が付与されました。" + deadline_text);
        return true;
      }
      else if (response_json?.data?.apply_result === 3) {
        const date = new Date(response_json?.data?.deadline_format);
        const date_text = date ? `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")} ${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}(中国時間)に再度お試しください。` : "";
        console.log("申請リクエストを送信しましたが、ブートローダーのアンロック権限は付与されませんでした。" + date_text);
      }
    }
    else {
      console.error("申請リクエストにエラーが発生しました。エラーコード: " + response_json?.code);
    }
  }
  catch {
    if (response.ok) {
      console.error("申請リクエストを送信しましたが、サーバーから返された文字列をJSON形式ではなかったため、パースできませんでした。\nレスポンス ボディ: " + response_text);
    }
    else {
      console.error("申請リクエストを正常に送信できませんでした。");
    }
  }
  return false;
}

async function bl_auth(cookie) {
  return await fetch("https://sgp-api.buy.mi.com/bbs/api/global/apply/bl-auth", { method: "POST", headers: { Cookie: cookie, "Content-Type": "application/json; charset=utf-8", "Accept-Encoding": "gzip, deflate, br", "User-Agent": "okhttp/4.12.0" }, body: '{"is_retry":true}' });
}
