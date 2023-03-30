import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';

import type { CreateUserInput, UpdateUserInput } from 'src/graphql.autogen';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  private users: UserEntity[] = [];

  constructor(private readonly repository: UserRepository) {}

  async create(createUserInput: CreateUserInput): Promise<UserEntity> {
    const entity = UserEntity.new({
      name: createUserInput.name,
      age: createUserInput.age,
    });

    return await this.repository.create(entity);
  }

  async findAll(): Promise<UserEntity[]> {
    return this.users;
  }

  async findByUuid(uuid: string): Promise<UserEntity | null> {
    return await this.repository.findByUuid(uuid);
  }

  async update(
    id: string,
    updateUserInput: UpdateUserInput,
  ): Promise<UserEntity | null> {
    const targets = this.users.filter((user) => user.uuid === id);

    if (targets.length === 0) {
      return null;
    }

    if (targets.length === 1) {
      const entity = targets[0];
      if (entity === undefined) {
        return null;
      }

      entity.update({
        name: updateUserInput.name,
        age: updateUserInput.age,
      });
    }

    throw new Error('UUID is duplicated');
  }

  async removeByUuid(id: string): Promise<void> {
    const idSet = new Set(this.users.map((user) => user.uuid));
    if (!idSet.has(id)) {
      throw new Error('Not found');
    }

    this.users = this.users.filter((user) => user.uuid !== id);
  }
}
