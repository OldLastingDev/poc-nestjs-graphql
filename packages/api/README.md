# `@tutorial/api`

## Description

Nestjs のサンプルを基に GraphQL API を実装するために色々試験的に実装しているリポジトリです。


## モジュールについて

このプロジェクトでは扱うデータ単位でモジュールを作成しています。作成時現在の設計では UserModule と TaskModule が相互に機能しあう想定ではありますが、うまく機能するかは今後実装しながら考えます。

## TypeScript のバージョンについて

現在このプロジェクトでは v4 系を扱っていますが、最新は v5 です。[NestJS 本体がまだ v5 に対応できていないよう](https://github.com/nestjs/nest/pull/11293)なので、対応され次第本プロジェクトでも v5 を採用します。

## Special thanks

* [Nestjs](https://docs.nestjs.com/)
* [GraphQL Tutorial](https://docs.nestjs.com/graphql/quick-start)
* [12-graphql-schema-first](https://github.com/nestjs/nest/tree/master/sample/12-graphql-schema-first)
