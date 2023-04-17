import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';
import { ULID } from 'src/libs/ulid';
import { TaskEntity } from 'src/task/task.entity';

type InputCreateUser = {
  name: string;
  age: number;
};

type InputUpdateUser = {
  name: string;
  age: number;
};

@Injectable()
export class UserUsecase {
  constructor(private readonly repository: UserRepository) {}

  async create({ name, age }: InputCreateUser): Promise<UserEntity> {
    const entity = UserEntity.new({
      name: name,
      age: age,
    });

    return await this.repository.save(entity);
  }

  // TODO(enhancement): pagination
  async findAll(): Promise<UserEntity[]> {
    return await this.repository.findAll();
  }

  async findByUlid(ulid: ULID): Promise<UserEntity | undefined> {
    return await this.repository.findByUlid(ulid);
  }

  async findByTask(task: TaskEntity): Promise<UserEntity | undefined> {
    return await this.repository.findByTask(task);
  }

  async update(
    entity: UserEntity,
    { name, age }: InputUpdateUser,
  ): Promise<UserEntity> {
    entity.update({
      name: name,
      age: age,
    });

    return await this.repository.save(entity);
  }

  async remove(entity: UserEntity): Promise<void> {
    entity.trash();

    await this.repository.save(entity);
  }
}
