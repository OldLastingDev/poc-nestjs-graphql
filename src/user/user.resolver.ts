import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import type { CreateUserInput, UpdateUserInput } from 'src/graphql.autogen';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation('createUser')
  async create(@Args('createUserInput') createUserInput: CreateUserInput) {
    return await this.userService.create(createUserInput);
  }

  @Query('users')
  async findAll() {
    return await this.userService.findAll();
  }

  @Query('user')
  async findByUuid(@Args('id') id: string) {
    return await this.userService.findByUuid(id);
  }

  @Mutation('updateUser')
  async update(
    @Args('id') id: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return await this.userService.update(id, updateUserInput);
  }

  @Mutation('removeUser')
  async remove(@Args('id') id: string) {
    return await this.userService.removeByUuid(id);
  }
}
