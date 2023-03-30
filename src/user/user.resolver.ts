import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import type {
  CreateUserInput,
  UpdateUserInput,
  User,
} from 'src/graphql.autogen';
import { UserPresenter } from './user.presenter';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
  constructor(
    private readonly service: UserService,
    private readonly presenter: UserPresenter,
  ) {}

  @Mutation('createUser')
  async create(@Args('createUserInput') createUserInput: CreateUserInput) {
    const entity = await this.service.create(createUserInput);
    return this.presenter.toResponse(entity);
  }

  @Query('users')
  async findAll(): Promise<User[]> {
    const entities = await this.service.findAll();
    return entities.map(this.presenter.toResponse);
  }

  @Query('user')
  async findByUuid(@Args('id') id: string): Promise<User | null> {
    const entity = await this.service.findByUuid(id);
    if (entity === null) {
      return null;
    }

    return this.presenter.toResponse(entity);
  }

  @Mutation('updateUser')
  async update(
    @Args('id') uuid: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<User> {
    const entity = await this.service.update(uuid, updateUserInput);
    return this.presenter.toResponse(entity);
  }

  @Mutation('removeUser')
  async remove(@Args('id') uuid: string): Promise<boolean> {
    await this.service.removeByUuid(uuid);
    return true;
  }
}
