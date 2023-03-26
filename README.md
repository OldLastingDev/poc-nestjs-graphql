# NestJS tutorial for GraphQL API
## Description

Nestjs のサンプルを基に GraphQL API を実装するために色々試験的に実装しているリポジトリです。

**Goal: TODO アプリっぽいことを実現するための GraphQL API を作る**

## Feature

TBD

## モジュールについて

このプロジェクトでは扱うデータ単位でモジュールを作成しています。作成時現在の設計では UserModule と TaskModule が相互に機能しあう想定ではありますが、うまく機能するかは今後実装しながら考えます。

## TypeScript のバージョンについて

現在このプロジェクトでは v4 系を扱っていますが、最新は v5 です。[NestJS 本体がまだ v5 に対応できていないよう](https://github.com/nestjs/nest/pull/11293)なので、対応され次第本プロジェクトでも v5 を採用します。

## Installation

```bash
$ npm install
```

## Generate code from GraphQL schema

このリポジトリでは Schema First 手法を採用しています。開発前に必ず以下のコマンドを実行して型定義を最新にしてください。

```bash
$ npm run codegen
```

## Running the app

```bash
# development(watch mode)
$ npm run dev
```

## Test

E2E テストは REST API のサンプルから GraphQL へ変更したのでまったく動かないと思います。

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Special thanks

* [Nestjs](https://docs.nestjs.com/)
* [GraphQL Tutorial](https://docs.nestjs.com/graphql/quick-start)
* [12-graphql-schema-first](https://github.com/nestjs/nest/tree/master/sample/12-graphql-schema-first)
