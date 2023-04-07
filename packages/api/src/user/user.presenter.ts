import { Injectable } from '@nestjs/common';
import { User } from 'src/graphql.autogen';
import { UserEntity } from './user.entity';

@Injectable()
export class UserPresenter {
  // TODO(enhancement): バリデーション関数の実装

  toResponse(entity: UserEntity): User {
    return {
      id: entity.uuid,
      name: entity.name,
      age: entity.age,
    };
  }
}
