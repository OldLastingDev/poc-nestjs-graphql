import type { Task } from 'src/graphql.autogen';
import type { TaskEntity } from './task.entity';

export class TaskPresenter {
  toResposne(entity: TaskEntity): Omit<Task, 'owner'> {
    return {
      id: entity.ulid,
      title: entity.title,
      description: entity.description,
      done: entity.done,
    };
  }
}
