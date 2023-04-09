import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { CreateTaskInput, Task, UpdateTaskInput } from 'src/graphql.autogen';
import { asULID } from 'src/libs/ulid';
import { TaskPresenter } from './task.presenter';

@Resolver('Task')
export class TaskResolver {
  constructor(private readonly service: TaskService, private readonly presenter: TaskPresenter) {}

  @Mutation('createTask')
  async create(@Args('createTaskInput') createTaskInput: CreateTaskInput): Promise<Task> {
    const entity =  await this.service.create(createTaskInput);

    return this.presenter.toResposne(entity);
  }

  @Query('tasks')
  async findAll(): Promise<Task[]> {
    const entities = await this.service.findAll();

    return entities.map(this.presenter.toResposne);
  }

  @Query('task')
  async findOne(@Args('id') id: string): Promise<Task | null> {
    const ulid = asULID(id);
    const entity = await this.service.findByUlid(ulid);

    if (entity === null) {
      return null;
    }

    return this.presenter.toResposne(entity);
  }

  @Mutation('didTask')
  async didTask(@Args('id') id: string): Promise<Task> {
    const ulid = asULID(id);
    const entity = await this.service.didByUlid(ulid);

    return this.presenter.toResposne(entity);
  }

  @Mutation('updateTask')
  async update(
    @Args('id') id: string,
    @Args('updateTaskInput') updateTaskInput: UpdateTaskInput,
  ): Promise<Task> {
    const ulid = asULID(id);
    const entity = await this.service.update(ulid, updateTaskInput);

    return this.presenter.toResposne(entity);
  }

  @Mutation('removeTask')
  async remove(@Args('id') id: string): Promise<boolean> {
    const ulid = asULID(id);
    await this.service.removeByUlid(ulid);

    return true;
  }
}
