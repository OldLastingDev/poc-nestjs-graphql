import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';
import { ULID } from 'src/libs/ulid';

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
  constructor(private readonly userRepository: UserRepository) {}

  async create({ name, age }: InputCreateUser): Promise<UserEntity> {
    const entity = UserEntity.new({
      name: name,
      age: age,
    });

    return await this.userRepository.save(entity);
  }

  // TODO(enhancement): pagination
  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.findAll();
  }

  async findByUlid(ulid: ULID): Promise<UserEntity | undefined> {
    // TODO(enhancement): undefined ならエラーを投げる
    return await this.userRepository.findByUlid(ulid);
  }

  async update(
    entity: UserEntity,
    { name, age }: InputUpdateUser,
  ): Promise<UserEntity> {
    entity.update({
      name: name,
      age: age,
    });

    return await this.userRepository.save(entity);
  }

  async remove(entity: UserEntity): Promise<void> {
    entity.trash();

    await this.userRepository.save(entity);
  }
}
