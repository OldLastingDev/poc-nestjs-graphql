import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { CreateTaskInput, UpdateTaskInput } from 'src/graphql.autogen';

@Resolver('Task')
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Mutation('createTask')
  create(@Args('createTaskInput') createTaskInput: CreateTaskInput) {
    return this.taskService.create(createTaskInput);
  }

  @Query('task')
  findAll() {
    return this.taskService.findAll();
  }

  @Query('task')
  findOne(@Args('id') id: string) {
    return this.taskService.findByUuid(id);
  }

  @Mutation('updateTask')
  update(
    @Args('id') id: string,
    @Args('updateTaskInput') updateTaskInput: UpdateTaskInput,
  ) {
    return this.taskService.update(id, updateTaskInput);
  }

  @Mutation('removeTask')
  remove(@Args('id') id: string) {
    return this.taskService.remove(id);
  }
}
