import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskResolver } from './task.resolver';
import { TaskPresenter } from './task.presenter';
import { TaskRepository } from './task.repository';

@Module({
  providers: [TaskResolver, TaskService, TaskPresenter, TaskRepository],
})
export class TaskModule {}
