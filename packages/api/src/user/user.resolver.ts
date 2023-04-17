import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import type {
  CreateUserInput,
  UpdateUserInput,
  User,
} from 'src/graphql.autogen';
import { UserPresenter } from './user.presenter';
import { UserService } from './user.service';
import { asULID } from 'src/libs/ulid';
import { TaskUsecase } from 'src/task/task.usecase';
import { UserUsecase } from './user.usecase';
import { TaskPresenter } from 'src/task/task.presenter';
import { TaskWithoutOwner } from 'src/task/task.resolver';

export type UserWithoutTasks = Omit<User, 'tasks'>;

@Resolver('User')
export class UserResolver {
  constructor(
    private readonly service: UserService,
    private readonly taskUsecase: TaskUsecase,
    private readonly userUsecase: UserUsecase,
    private readonly userPresenter: UserPresenter,
    private readonly taskPresenter: TaskPresenter,
  ) {}

  @Mutation('createUser')
  async create(@Args('createUserInput') createUserInput: CreateUserInput) {
    const entity = await this.service.create(createUserInput);
    return this.userPresenter.toResponse(entity);
  }

  @Query('users')
  async findAll(): Promise<UserWithoutTasks[]> {
    const entities = await this.service.findAll();
    return entities.map(this.userPresenter.toResponse);
  }

  @Query('user')
  async findByUlid(
    @Args('id') id: string,
  ): Promise<UserWithoutTasks | undefined> {
    const ulid = asULID(id);
    const entity = await this.service.findByUlid(ulid);

    if (entity === undefined) {
      return undefined;
    }

    return this.userPresenter.toResponse(entity);
  }

  @ResolveField('tasks')
  async findAllTasksBelongingToUser(
    @Parent() user: User,
  ): Promise<TaskWithoutOwner[]> {
    // TODO(enhancement): dataloader
    const ownerUlid = asULID(user.id);
    const owner = await this.userUsecase.findByUlid(ownerUlid);
    if (owner === undefined) {
      throw new Error(`Not found a user: ${ownerUlid}`); // this error must be unreachable
    }

    const tasks = await this.taskUsecase.findAllBelongingToUser(owner);
    return tasks.map(this.taskPresenter.toResposne);
  }

  @Mutation('updateUser')
  async update(
    @Args('id') id: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<UserWithoutTasks> {
    const ulid = asULID(id);
    const entity = await this.service.update(ulid, updateUserInput);
    return this.userPresenter.toResponse(entity);
  }

  @Mutation('removeUser')
  async remove(@Args('id') id: string): Promise<boolean> {
    const ulid = asULID(id);
    await this.service.removeByUlid(ulid);
    return true;
  }
}
