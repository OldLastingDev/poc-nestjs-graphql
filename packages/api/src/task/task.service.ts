import { Injectable } from '@nestjs/common';
import { CreateTaskInput, UpdateTaskInput } from 'src/graphql.autogen';
import { TaskEntity } from './task.entity';
import { ULID } from 'src/libs/ulid';
import { TaskUsecase } from './task.usecase';
import { UserUsecase } from 'src/user/user.usecase';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskUsecase: TaskUsecase,
    private readonly userUsecase: UserUsecase,
  ) {}

  async create(input: CreateTaskInput, userUlid: ULID): Promise<TaskEntity> {
    const owner = await this.userUsecase.findByUlid(userUlid);
    if (owner === undefined) {
      throw new Error(`Not found a user: ${userUlid}`);
    }

    const entity = await this.taskUsecase.create(
      {
        title: input.title,
        description: input.description,
        deadlineAt:
          input.deadlineAt === undefined
            ? undefined
            : new Date(input.deadlineAt),
      },
      owner,
    );
    return entity;
  }

  async findAll(): Promise<TaskEntity[]> {
    return await this.taskUsecase.findAll();
  }

  async findByUlid(ulid: ULID): Promise<TaskEntity | undefined> {
    const entity = await this.taskUsecase.findByUlid(ulid);
    return entity;
  }

  async didByUlid(ulid: ULID): Promise<TaskEntity> {
    const entity = await this.taskUsecase.findByUlid(ulid);
    if (entity === undefined) {
      throw new Error(`Not found a task: ${ulid}`);
    }

    return await this.taskUsecase.did(entity);
  }

  async undoByUlid(ulid: ULID): Promise<TaskEntity> {
    const entity = await this.taskUsecase.findByUlid(ulid);
    if (entity === undefined) {
      throw new Error(`Not found a task: ${ulid}`);
    }

    return await this.taskUsecase.undo(entity);
  }

  async update(ulid: ULID, input: UpdateTaskInput): Promise<TaskEntity> {
    const entity = await this.taskUsecase.findByUlid(ulid);
    if (entity === undefined) {
      throw new Error(`Not found a task: ${ulid}`);
    }

    return await this.taskUsecase.update(entity, {
      title: input.title,
      description: input.description,
      deadlineAt: input.deadlineAt ? new Date(input.deadlineAt) : undefined,
    });
  }

  async removeByUlid(ulid: ULID): Promise<void> {
    const entity = await this.taskUsecase.findByUlid(ulid);
    if (entity === undefined) {
      throw new Error(`Not found a task: ${ulid}`);
    }

    await this.taskUsecase.trash(entity);
  }
}
