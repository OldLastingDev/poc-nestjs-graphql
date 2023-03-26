import { Task } from 'src/graphql.autogen';
import { TaskEntity } from './task.entity';

export class TaskPresenter {
  toResposne(entity: TaskEntity): Omit<Task, 'owner'> {
    return {
      id: entity.uuid,
      title: entity.title,
      description: entity.description,
      done: entity.done,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
  // TODO(enhancement) toResponseWithOwner
}
