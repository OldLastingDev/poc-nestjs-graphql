import { Injectable } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { TaskEntity } from './task.entity';
import { ULID } from 'src/libs/ulid';

type InputCreateTask = {
  title: string,
  description: string,
  deadlineAt?: Date,
};

type InputUpdateTask = {
  title: string,
  description: string,
  deadlineAt?: Date,
};

@Injectable()
export class TaskUsecase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async create({ title, description, deadlineAt }: InputCreateTask): Promise<TaskEntity> {
    const entity = TaskEntity.new({
      title: title,
      description: description,
      deadlineAt: deadlineAt
    });

    return await this.taskRepository.save(entity);
  }

  // TODO(enhancement): pagination
  async findAll(): Promise<TaskEntity[]> {
    return await this.taskRepository.findAll();
  }

  async findByUlid(ulid: ULID): Promise<TaskEntity | undefined> {
    return await this.taskRepository.findByUlid(ulid);
  }

  async did(entity: TaskEntity): Promise<TaskEntity> {
    entity.did();

    return await this.taskRepository.save(entity);
  }

  async undo(entity: TaskEntity): Promise<TaskEntity> {
    entity.undo();

    return await this.taskRepository.save(entity);
  }

  async update(
    entity: TaskEntity,
    { title, description, deadlineAt}: InputUpdateTask,
  ): Promise<TaskEntity> {
    entity.update({
      title: title,
      description: description,
      deadlineAt: deadlineAt
    });

    return await this.taskRepository.save(entity);
  }

  async remove(entity: TaskEntity): Promise<void> {
    entity.trash();

    await this.taskRepository.save(entity);
  }
}
