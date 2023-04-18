import { Injectable } from '@nestjs/common';
import type { User } from 'src/graphql.autogen';
import type { UserEntity } from './user.entity';

@Injectable()
export class UserPresenter {
  // TODO(enhancement): バリデーション関数の実装

  toResponse(entity: UserEntity): Omit<User, 'tasks'> {
    return {
      id: entity.ulid,
      name: entity.name,
      age: entity.age,
    };
  }
}
