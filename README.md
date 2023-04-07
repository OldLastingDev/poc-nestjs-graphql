# [PoC] NestJS & Next.js

このリポジトリは、以下の技術スタックを試すためにあります:

* NestJS
* Next.js
* GraphQL
  * Apollo Server & Client
* Prisma
* Firebase Authentication
* npm workspace

## 全体のディレクトリ構成

`/packages` 配下に monorepo で管理したいソースコードが揃っています。 npm workspace を活用しているため、各ディレクトリで依存ライブラリをインストールする必要はありません。

## 開発手順

### 依存ライブラリのインストール

開発を始まる前に、本リポジトリが依存しているライブラリをインストールします。

```sh
$npm install
```

これで `/packages` 配下のプロジェクトが依存しているライブラリがすべてインストールされます。

### API

現段階ではローカル環境向けの DB として SQLite3 を採用しているため、まずはマイグレーションを行います。

```sh
$npx -w @tutorial/api prisma migrate dev
```

続いて、本プロジェクトでは "Schema first" を採用しているため、GraphQL Schema から型情報を生成します。

```sh
$npm run -w @tutorial/api codegen
```

ここまでくれば準備完了なので、以下のコマンドで開発サーバーを起動します。

```sh
$npm run -w @tutorial/api dev
```

### Web Front

未実装