import { Injectable } from '@nestjs/common';
import { CreateTaskInput, UpdateTaskInput } from 'src/graphql.autogen';
import { TaskEntity } from './task.entity';
import { ULID } from 'src/libs/ulid';
import { TaskUsecase } from './task.usecase';

@Injectable()
export class TaskService {
  constructor(private readonly usecase: TaskUsecase) {}

  async create(input: CreateTaskInput): Promise<TaskEntity> {
    const entity = await this.usecase.create({
      title: input.title,
      description: input.description,
      deadlineAt: input.deadlineAt === undefined ? undefined : new Date(input.deadlineAt),
    })
    return entity;
  }

  async findAll(): Promise<TaskEntity[]> {
    return await this.usecase.findAll();
  }

  async findByUlid(ulid: ULID): Promise<TaskEntity | undefined> {
    const entity = await this.usecase.findByUlid(ulid);
    return entity;
  }

  async didByUlid(ulid: ULID): Promise<TaskEntity> {
    const entity = await this.usecase.findByUlid(ulid);
    if (entity === undefined) {
      throw new Error(`Not found a task: ${ulid}`);
    }

    return await this.usecase.did(entity);
  }

  async update(ulid: ULID, input: UpdateTaskInput): Promise<TaskEntity> {
    const entity = await this.usecase.findByUlid(ulid);
    if (entity === undefined) {
      throw new Error(`Not found a task: ${ulid}`);
    }

    return await this.usecase.update(entity, {
      title: input.title,
      description: input.description,
      deadlineAt: input.deadlineAt ? new Date(input.deadlineAt) : undefined,
    })
  }

  async removeByUlid(ulid: ULID): Promise<void> {
    const entity = await this.usecase.findByUlid(ulid);
    if (entity === undefined) {
      throw new Error(`Not found a task: ${ulid}`);
    }

    await this.usecase.trash(entity);
  }
}
