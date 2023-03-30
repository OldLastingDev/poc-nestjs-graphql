import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';

type InputCreateUser = {
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

    return await this.userRepository.create(entity);
  }

  // TODO(enhancement): pagination
  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.findAll();
  }

  async findByUuid(uuid: string): Promise<UserEntity | null> {
    return this.userRepository.findByUuid(uuid);
  }
}
