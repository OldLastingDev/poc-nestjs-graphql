import { Injectable } from '@nestjs/common';
import { generateUuid } from 'src/libs/uuid';
import { UserEntity } from './entities/user.entity';

import type { CreateUserInput } from './dto/create-user.input';
import type { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  private users: UserEntity[] = [];

  async create(createUserInput: CreateUserInput): Promise<UserEntity> {
    const entity = new UserEntity({
      uuid: generateUuid(),
      name: createUserInput.name,
      age: createUserInput.age,
    });
    this.users.push(entity);

    return entity;
  }

  async findAll(): Promise<UserEntity[]> {
    return this.users;
  }

  async findByUuid(id: string): Promise<UserEntity | null> {
    const targets = this.users.filter((user) => user.uuid === id);

    if (targets.length === 0) {
      return null;
    }

    if (targets.length === 1) {
      return targets[0] !== undefined ? targets[0] : null;
    }

    throw new Error('UUID is duplicated');
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
