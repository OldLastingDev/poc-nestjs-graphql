import { Injectable } from '@nestjs/common';
import { CreateTaskInput, UpdateTaskInput } from 'src/graphql.autogen';
import { TaskEntity } from './task.entity';

@Injectable()
export class TaskService {
  private tasks: TaskEntity[] = [];
  async create(input: CreateTaskInput): Promise<TaskEntity> {
    const entity = new TaskEntity({
      title: input.title,
      description: input.description,
      // TODO(enhancement): User を DB から引っ張ってきて存在が証明されてから ownerId を指定する
      ownerId: input.ownerId,
      deadlineAt: input.deadlineAt ? new Date(input.deadlineAt) : undefined,
    });
    this.tasks.push(entity);

    return entity;
  }

  async findAll(): Promise<TaskEntity[]> {
    return this.tasks;
  }

  async findByUuid(id: string): Promise<TaskEntity | null> {
    const targetIndex = this.tasks.findIndex((task) => task.ulid === id);
    if (targetIndex === -1) {
      return null;
    }

    return this.tasks[targetIndex];
  }

  async update(id: string, input: UpdateTaskInput): Promise<TaskEntity | null> {
    const targetIndex = this.tasks.findIndex((task) => task.ulid === id);
    if (targetIndex === -1) {
      return null;
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

  async remove(id: string): Promise<void> {
    this.tasks = this.tasks.filter((task) => task.ulid !== id);
  }
}
