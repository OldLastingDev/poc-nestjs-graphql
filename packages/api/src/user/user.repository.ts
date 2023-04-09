import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserEntity } from './user.entity';
import { ULID, asULID } from 'src/libs/ulid';
import { IRepository } from 'src/interfaces/IRepository';

@Injectable()
export class UserRepository implements IRepository<UserEntity> {
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

    return models.map(toEntity);
  }

  async findByUlid(ulid: ULID): Promise<UserEntity | undefined> {
    try {
      // findFirstOrThrow だと where がユニークなもの以外指定できない
      const model = await this.prisma.user.findFirstOrThrow({
        where: {
          uuid: ulid,
          deletedAt: {
            equals: null,
          },
        },
      });

      return toEntity(model);
    } catch {
      return undefined;
    }
  }

  async save(entity: UserEntity): Promise<UserEntity> {
    if (entity.hasPerpetuated()) {
      return await this.update(entity);
    }

    return await this.create(entity);
  }

  private async create(entity: UserEntity): Promise<UserEntity> {
    const model = await this.prisma.user.create({
      data: {
        uuid: entity.ulid,
        name: entity.name,
        age: entity.age,
      },
    });

    return toEntity(model);
  }

  private async update(entity: UserEntity): Promise<UserEntity> {
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

    return toEntity(model);
  }
}

function toEntity(model: User): UserEntity {
    const entity = UserEntity.factoryWithAllProperties({
      id: model.id,
      ulid: asULID(model.uuid),
      name: model.name,
      age: model.age,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
      deletedAt: model.deletedAt,
    });

    return entity;
  }
