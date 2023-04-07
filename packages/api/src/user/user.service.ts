import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';

import type { CreateUserInput, UpdateUserInput } from 'src/graphql.autogen';
import { UserUsecase } from './user.usecase';

@Injectable()
export class UserService {
  private users: UserEntity[] = [];

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

  async findByUuid(uuid: string): Promise<UserEntity | null> {
    return await this.userUsecase.findByUuid(uuid);
  }

  /**
   * @throws 指定した UUID の User が存在しなかった場合
   */
  async update(
    uuid: string,
    updateUserInput: UpdateUserInput,
  ): Promise<UserEntity> {
    const target = await this.userUsecase.findByUuid(uuid);

    if (target === null) {
      throw new Error('Not found a user');
    }

    return await this.userUsecase.update(target, {
      name: updateUserInput.name,
      age: updateUserInput.age,
    });
  }

  async removeByUuid(uuid: string): Promise<void> {
    const target = await this.userUsecase.findByUuid(uuid);

    if (target === null) {
      throw new Error('Not found a user');
    }

    await this.userUsecase.remove(target);
  }
}
