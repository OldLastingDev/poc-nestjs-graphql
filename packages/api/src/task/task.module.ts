import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskResolver } from './task.resolver';
import { TaskPresenter } from './task.presenter';

@Module({
  providers: [TaskResolver, TaskService, TaskPresenter],
})
export class TaskModule {}
