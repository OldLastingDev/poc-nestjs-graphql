import { Injectable } from '@nestjs/common';
import { User } from 'src/graphql.autogen';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserPresenter {
  toResponse(entity: UserEntity): User {
    return {
      id: entity.uuid,
      name: entity.name,
      age: entity.age,
    };
  }
}
