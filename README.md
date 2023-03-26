# NestJS tutorial for GraphQL API
## Description

Nestjs のサンプルを基に GraphQL API を実装するために色々試験的に実装しているリポジトリです。

**Goal: TODO アプリっぽいことを実現するための GraphQL API を作る**

## Feature

TBD

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
