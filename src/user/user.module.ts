import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { UserPresenter } from './user.presenter';
import { UserRepository } from './user.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserUsecase } from './user.usecase';

@Module({
  imports: [PrismaModule],
  providers: [
    UserUsecase,
    UserService,
    UserResolver,
    UserPresenter,
    UserRepository,
  ],
})
export class UserModule {}
