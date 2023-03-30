import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  // TODO(enhancement): pagination
  async findAll(): Promise<UserEntity[]> {
    const models = await this.prisma.user.findMany({
      where: {
        deletedAt: {
          equals: null,
        },
      },
    });

    return models.map(this.toEntity);
  }

  async findByUuid(uuid: string): Promise<UserEntity | null> {
    try {
      // findFirstOrThrow だと where がユニークなもの以外指定できない
      const model = await this.prisma.user.findFirstOrThrow({
        where: {
          uuid: uuid,
          deletedAt: {
            equals: null,
          },
        },
      });

      return this.toEntity(model);
    } catch {
      return null;
    }
  }

  async create(entity: UserEntity): Promise<UserEntity> {
    const model = await this.prisma.user.create({
      data: {
        uuid: entity.uuid,
        name: entity.name,
        age: entity.age,
      },
    });

    return this.toEntity(model);
  }

  async update(entity: UserEntity): Promise<UserEntity> {
    const model = await this.prisma.user.update({
      where: {
        id: entity._id,
      },
      data: {
        name: entity.name,
        age: entity.age,
        deletedAt: entity.deletedAt,
      },
    });

    return this.toEntity(model);
  }

  private toEntity(model: User): UserEntity {
    const entity = UserEntity.factoryWithAllProperties({
      id: model.id,
      uuid: model.uuid,
      name: model.name,
      age: model.age,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
      deletedAt: model.deletedAt,
    });

    return entity;
  }
}
