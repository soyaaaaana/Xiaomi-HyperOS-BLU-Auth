# Xiaomi HyperOS BLU Auth
HyperOSの入ったXiaomiスマホをBootloader Unlockするために必要なXiaomi CommunityのBootloader Unlock申請を自動化します。

## 使い方
最低限Node.jsを実行できる環境が必要です。
<br>
また、正常に動作させるにはインターネットに接続する必要があります。
<br>
モバイルデータ通信などの従量制課金接続を使用する場合は、通信料金が発生する可能性がありますが、このツールは1日に5KBほどしか通信しないため影響はかなり小さいです（手動で通信した場合を除く）。

1. まず、`sample.env`ファイルを参考に、`.env`ファイルを作成します。
2. 次に、`.env`ファイルがあるディレクトリと同じディレクトリに`bl-auth.js`を配置します。
3. `npm i dotenv node-cron`を実行して実行に必要なモジュールをインストールします。
4. `node bl-auth.js`を実行して0時（中国時間。日本時間で1時）までターミナルになにも操作せず待機します。
5. これでたぶん成功します。（まだ自分は試してないです）

## `.env` ファイルについて
`.env` ファイルは、`cookie='(クッキーの情報)'` のような形式にする必要があります。以下に `.env` ファイルの例を示します。
<br>
```
cookie='new_bbs_serviceToken=xxxxxxxxxx;versionCode=500421;versionName=5.4.21;deviceID=ABCD1234'
```
`new_bbs_serviceToken` の値は、[mi.com](https://mi.com) にログインしてCookieにある `serviceToken` の値にします。
<br>
`versionCode`、`versionName`、`deviceID` の情報はなくても動作することを確認していますが、あったほうが安心かもしれません。

## ライセンス
[MIT License](https://mit-license.org/)です。`LICENSE`ファイルに詳細が記載されています。
