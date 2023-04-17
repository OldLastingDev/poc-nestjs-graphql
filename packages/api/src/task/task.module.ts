import { Module, forwardRef } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskResolver } from './task.resolver';
import { TaskPresenter } from './task.presenter';
import { TaskRepository } from './task.repository';
import { TaskUsecase } from './task.usecase';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [PrismaModule, forwardRef(() => UserModule)],
  providers: [
    TaskResolver,
    TaskService,
    TaskPresenter,
    TaskRepository,
    TaskUsecase,
  ],
  exports: [TaskUsecase, TaskPresenter],
})
export class TaskModule {}
