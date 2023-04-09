import { Injectable } from '@nestjs/common';
import { CreateTaskInput, UpdateTaskInput } from 'src/graphql.autogen';
import { TaskEntity } from './task.entity';
import { ULID } from 'src/libs/ulid';

@Injectable()
export class TaskService {
  private tasks: TaskEntity[] = [];
  async create(input: CreateTaskInput): Promise<TaskEntity> {
    const entity = new TaskEntity({
      title: input.title,
      description: input.description,
      deadlineAt: input.deadlineAt ? new Date(input.deadlineAt) : undefined,
    });
    this.tasks.push(entity);

    return entity;
  }

  async findAll(): Promise<TaskEntity[]> {
    return this.tasks;
  }

  async findByUlid(ulid: ULID): Promise<TaskEntity | null> {
    const targetIndex = this.tasks.findIndex((task) => task.ulid === ulid);
    if (targetIndex === -1) {
      return null;
    }

    return this.tasks[targetIndex];
  }

  async update(ulid: ULID, input: UpdateTaskInput): Promise<TaskEntity> {
    const targetIndex = this.tasks.findIndex((task) => task.ulid === ulid);
    if (targetIndex === -1) {
      throw new Error(`Not found a task: ${ulid}`);
    }

    const entity = this.tasks[targetIndex];
    entity.update({
      title: input.title,
      description: input.description,
      deadlineAt: input.deadlineAt ? new Date(input.deadlineAt) : undefined,
    });
    this.tasks[targetIndex] = entity;

    return entity;
  }

  async removeByUlid(ulid: ULID): Promise<void> {
    this.tasks = this.tasks.filter((task) => task.ulid !== ulid);
  }
}
