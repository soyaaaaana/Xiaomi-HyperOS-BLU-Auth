# Xiaomi BLU Auth
Xiaomi CommunityのBootloader Unlock申請を自動化します。

## 使い方
1. まず、`sample.env`ファイルを参考に、`.env`ファイルを作成します。
2. 次に、`.env`ファイルがあるディレクトリと同じディレクトリに`bl-auth.js`を配置します。
3. `npm i dotenv node-cron`を実行して実行に必要なモジュールをインストールします。
4. `node bl-auth.js`を実行して0時（中国時間。日本時間で1時）までターミナルになにも操作せず待機します。
5. これでたぶん成功します。（まだ自分は試してないです）

`.env`ファイルで使用するcookieは、プロキシを使用してHTTPS通信を監視することで取得できます。その他の方法については知りません。

## ライセンス
[MIT License](https://mit-license.org/)です。`LICENSE`ファイルに詳細が記載されています。
