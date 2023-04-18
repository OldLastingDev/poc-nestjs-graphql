import { Injectable } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { TaskEntity } from './task.entity';
import type { ULID } from 'src/libs/ulid';
import type { UserEntity } from 'src/user/user.entity';

type InputCreateTask = {
  title: string;
  description: string;
  deadlineAt?: Date | undefined;
};

type InputUpdateTask = {
  title: string;
  description: string;
  deadlineAt?: Date | undefined;
};

@Injectable()
export class TaskUsecase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async create(
    { title, description, deadlineAt }: InputCreateTask,
    owner: UserEntity,
  ): Promise<TaskEntity> {
    const entity = TaskEntity.new(
      {
        title: title,
        description: description,
        deadlineAt: deadlineAt,
      },
      owner,
    );

    return await this.taskRepository.save(entity);
  }

  // TODO(enhancement): pagination
  async findAllBelongingToUser(owner: UserEntity): Promise<TaskEntity[]> {
    return await this.taskRepository.findAllBelongingToUser(owner);
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
    { title, description, deadlineAt }: InputUpdateTask,
  ): Promise<TaskEntity> {
    entity.update({
      title: title,
      description: description,
      deadlineAt: deadlineAt,
    });

    return await this.taskRepository.save(entity);
  }

  async trash(entity: TaskEntity): Promise<void> {
    entity.trash();

    await this.taskRepository.save(entity);
  }
}
