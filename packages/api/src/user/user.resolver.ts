import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import type {
  CreateUserInput,
  UpdateUserInput,
  User,
} from 'src/graphql.autogen';
import { UserPresenter } from './user.presenter';
import { UserService } from './user.service';
import { asULID } from 'src/libs/ulid';

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
  async findByUuid(@Args('id') id: string): Promise<User | undefined> {
    const ulid = asULID(id);
    const entity = await this.service.findByUuid(ulid);

    return this.presenter.toResponse(entity);
  }

  @Mutation('updateUser')
  async update(
    @Args('id') id: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<User> {
    const ulid = asULID(id);
    const entity = await this.service.update(ulid, updateUserInput);
    return this.presenter.toResponse(entity);
  }

  @Mutation('removeUser')
  async remove(@Args('id') id: string): Promise<boolean> {
    const ulid = asULID(id);
    await this.service.removeByUlid(ulid);
    return true;
  }
}
