import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { UserPresenter } from './user.presenter';

@Module({
  providers: [UserResolver, UserService, UserPresenter],
})
export class UserModule {}
