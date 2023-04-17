import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ULID, asULID } from 'src/libs/ulid';
import { IRepository } from 'src/interfaces/IRepository';
import { TaskEntity } from './task.entity';
import { UserEntity } from 'src/user/user.entity';

@Injectable()
export class TaskRepository implements IRepository<TaskEntity> {
  constructor(private readonly prisma: PrismaService) {}

  // TODO(enhancement): pagination
  async findAllBelongingToUser(owner: UserEntity): Promise<TaskEntity[]> {
    const models = await this.prisma.task.findMany({
      where: {
        ownerId: owner._id,
        deletedAt: {
          equals: null,
        },
      },
      include: {
        owner: true,
      },
    });

    return models.map(toEntity);
  }

  async findByUlid(ulid: ULID): Promise<TaskEntity | undefined> {
    try {
      // findFirstOrThrow だと where がユニークなもの以外指定できない
      const model = await this.prisma.task.findFirstOrThrow({
        where: {
          ulid: ulid,
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

  async save(entity: TaskEntity): Promise<TaskEntity> {
    if (entity.hasPerpetuated()) {
      return await this.update(entity);
    }

    return await this.create(entity);
  }

  private async create(entity: TaskEntity): Promise<TaskEntity> {
    const model = await this.prisma.task.create({
      data: {
        ulid: entity.ulid,
        title: entity.title,
        description: entity.description,
        done: entity.done,
        deadlineAt: entity.deadlineAt,
        ownerId: entity.ownerId,
      },
    });

    return toEntity(model);
  }

  private async update(entity: TaskEntity): Promise<TaskEntity> {
    const model = await this.prisma.task.update({
      where: {
        id: entity._id,
      },
      data: {
        title: entity.title,
        description: entity.description,
        done: entity.done,
        deadlineAt: entity.deadlineAt,
        deletedAt: entity.deletedAt,
      },
    });

    return toEntity(model);
  }
}

function toEntity(model: Task): TaskEntity {
  const entity = TaskEntity.factoryWithAllProperties({
    id: model.id,
    ulid: asULID(model.ulid),
    title: model.title,
    description: model.description,
    done: model.done,
    deadlineAt: model.deadlineAt,
    ownerId: model.ownerId,
    createdAt: model.createdAt,
    updatedAt: model.updatedAt,
    deletedAt: model.deletedAt,
  });

  return entity;
}
