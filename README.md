<div align="center">
  <h1>Xiaomi HyperOS BLU Auth</h1>
  HyperOSがインストールされているXiaomiスマホをBootloader Unlockするために必要なXiaomi CommunityのBootloader Unlock申請を自動化します。
</div>

## 必要なもの
- 作成から30日経過した有効なXiaomiアカウント
- Node.jsとNPM（Node.jsはv23.11.0でのみ検証）
- インターネット接続

## 使い方
1. `sample.env` ファイルを参考に、`.env` ファイルを作成します。
2. `.env` ファイルがあるディレクトリと同じディレクトリに `bl-auth.js` と `package.json` を配置します。
3. `npm start` を実行して0時（中国時間で0時、日本時間で1時）までターミナルになにも操作せず待機します。
4. 運が良ければ成功してブートローダーアンロック権限がもらえます。

## `.env` ファイルについて
`.env` ファイルは、`cookie='(クッキーの情報)'` のような形式にする必要があります。以下に `.env` ファイルの例を示します。
<br>
```
cookie='new_bbs_serviceToken=xxxxxxxxxx;versionCode=500421;versionName=5.4.21;deviceID=ABCD1234'
```
`new_bbs_serviceToken` の値は、[mi.com](https://mi.com) にサインインするとCookieに設定される `serviceToken` の値にします。
<br>
`versionCode`、`versionName`、`deviceID` の情報はなくても動作することを確認していますが、あったほうが安心かもしれません。

## ライセンス
[MIT License](https://mit-license.org/)です。`LICENSE`ファイルに詳細が記載されています。
