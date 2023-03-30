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

  async update(
    uuid: string,
    updateUserInput: UpdateUserInput,
  ): Promise<UserEntity | null> {
    const target = await this.userUsecase.findByUuid(uuid);

    if (target === null) {
      return null;
    }

    return await this.userUsecase.update(target, {
      name: updateUserInput.name,
      age: updateUserInput.age,
    });
  }

  async removeByUuid(id: string): Promise<void> {
    const idSet = new Set(this.users.map((user) => user.uuid));
    if (!idSet.has(id)) {
      throw new Error('Not found');
    }

    this.users = this.users.filter((user) => user.uuid !== id);
  }
}
