import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';

import type { CreateUserInput, UpdateUserInput } from 'src/graphql.autogen';
import { UserUsecase } from './user.usecase';
import { ULID } from 'src/libs/ulid';

@Injectable()
export class UserService {
  constructor(private readonly userUsecase: UserUsecase) {}

  async create(createUserInput: CreateUserInput): Promise<UserEntity> {
    return this.userUsecase.create({
      name: createUserInput.name,
      age: createUserInput.age,
    });
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userUsecase.findAll();
  }

  async findByUlid(ulid: ULID): Promise<UserEntity | undefined> {
    return await this.userUsecase.findByUlid(ulid);
  }

  /**
   * @throws 指定した ULID の User が存在しなかった場合
   */
  async update(
    ulid: ULID,
    updateUserInput: UpdateUserInput,
  ): Promise<UserEntity> {
    const target = await this.userUsecase.findByUlid(ulid);

    if (target === undefined) {
      throw new Error('Not found a user');
    }

    return await this.userUsecase.update(target, {
      name: updateUserInput.name,
      age: updateUserInput.age,
    });
  }

  async removeByUlid(ulid: ULID): Promise<void> {
    const target = await this.userUsecase.findByUlid(ulid);

    if (target === undefined) {
      throw new Error('Not found a user');
    }

    await this.userUsecase.remove(target);
  }
}
