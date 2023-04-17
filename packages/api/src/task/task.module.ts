import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskResolver } from './task.resolver';
import { TaskPresenter } from './task.presenter';
import { TaskRepository } from './task.repository';
import { TaskUsecase } from './task.usecase';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [PrismaModule, UserModule],
  providers: [
    TaskResolver,
    TaskService,
    TaskPresenter,
    TaskRepository,
    TaskUsecase,
  ],
})
export class TaskModule {}
