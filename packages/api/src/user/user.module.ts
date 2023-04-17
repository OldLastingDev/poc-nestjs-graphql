import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { UserPresenter } from './user.presenter';
import { UserRepository } from './user.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserUsecase } from './user.usecase';
import { TaskModule } from 'src/task/task.module';

@Module({
  imports: [PrismaModule, forwardRef(() => TaskModule)],
  providers: [
    UserUsecase,
    UserService,
    UserResolver,
    UserPresenter,
    UserRepository,
  ],
  exports: [UserUsecase, UserPresenter],
})
export class UserModule {}
