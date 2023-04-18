import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { TaskService } from './task.service';
import { asULID } from 'src/libs/ulid';
import { TaskPresenter } from './task.presenter';
import { TaskUsecase } from './task.usecase';
import { UserUsecase } from 'src/user/user.usecase';
import { UserPresenter } from 'src/user/user.presenter';
import type { UserWithoutTasks } from 'src/user/user.resolver';
import type {
  CreateTaskInput,
  Task,
  UpdateTaskInput,
} from 'src/graphql.autogen';

export type TaskWithoutOwner = Omit<Task, 'owner'>;

@Resolver('Task')
export class TaskResolver {
  constructor(
    private readonly service: TaskService,
    private readonly taskPresenter: TaskPresenter,
    private readonly userPresenter: UserPresenter,
    private readonly taskUsecase: TaskUsecase,
    private readonly userUsecase: UserUsecase,
  ) {}

  @Mutation('createTask')
  async create(
    @Args('createTaskInput') createTaskInput: CreateTaskInput,
    @Args('userId') userId: string,
  ): Promise<TaskWithoutOwner> {
    const userUlid = asULID(userId);
    const entity = await this.service.create(createTaskInput, userUlid);

    return this.taskPresenter.toResposne(entity);
  }

  @Query('tasks')
  async findAllBelongingToUser(
    @Args('userId') userId: string,
  ): Promise<TaskWithoutOwner[]> {
    const userUlid = asULID(userId);
    const entities = await this.service.findAllBelongingToUser(userUlid);

    return entities.map(this.taskPresenter.toResposne);
  }

  @Query('task')
  async findOne(@Args('id') id: string): Promise<TaskWithoutOwner | undefined> {
    const ulid = asULID(id);
    const entity = await this.service.findByUlid(ulid);

    if (entity === undefined) {
      return undefined;
    }

    return this.taskPresenter.toResposne(entity);
  }

  @ResolveField('owner')
  async findUserByTask(@Parent() task: Task): Promise<UserWithoutTasks> {
    // TODO(enhancement): dataloader
    const taskUlid = asULID(task.id);
    const taskEntity = await this.taskUsecase.findByUlid(taskUlid);
    if (taskEntity === undefined) {
      throw new Error(`Not found a task: ${taskUlid}`); // this error must be unreachable
    }

    const owner = await this.userUsecase.findByTask(taskEntity);
    if (owner === undefined) {
      throw new Error(`Not found a user, who has the task@${task.id}`);
    }

    return this.userPresenter.toResponse(owner);
  }

  @Mutation('didTask')
  async didTask(@Args('id') id: string): Promise<TaskWithoutOwner> {
    const ulid = asULID(id);
    const entity = await this.service.didByUlid(ulid);

    return this.taskPresenter.toResposne(entity);
  }

  @Mutation('undoTask')
  async undoTask(@Args('id') id: string): Promise<TaskWithoutOwner> {
    const ulid = asULID(id);
    const entity = await this.service.undoByUlid(ulid);

    return this.taskPresenter.toResposne(entity);
  }

  @Mutation('updateTask')
  async update(
    @Args('id') id: string,
    @Args('updateTaskInput') updateTaskInput: UpdateTaskInput,
  ): Promise<TaskWithoutOwner> {
    const ulid = asULID(id);
    const entity = await this.service.update(ulid, updateTaskInput);

    return this.taskPresenter.toResposne(entity);
  }

  @Mutation('removeTask')
  async remove(@Args('id') id: string): Promise<boolean> {
    const ulid = asULID(id);
    await this.service.removeByUlid(ulid);

    return true;
  }
}
