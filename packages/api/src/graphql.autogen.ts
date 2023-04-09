
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateTaskInput {
    title: string;
    description: string;
    deadlineAt?: Nullable<number>;
}

export class UpdateTaskInput {
    title: string;
    description: string;
    deadlineAt?: Nullable<number>;
}

export class CreateUserInput {
    name: string;
    age: number;
}

export class UpdateUserInput {
    name: string;
    age: number;
}

export class Task {
    id: string;
    title: string;
    description: string;
    done: boolean;
    deadlineAt?: Nullable<number>;
}

export abstract class IQuery {
    abstract tasks(): Nullable<Task>[] | Promise<Nullable<Task>[]>;

    abstract task(id: string): Nullable<Task> | Promise<Nullable<Task>>;

    abstract users(): Nullable<User>[] | Promise<Nullable<User>[]>;

    abstract user(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IMutation {
    abstract createTask(createTaskInput: CreateTaskInput): Task | Promise<Task>;

    abstract updateTask(updateTaskInput: UpdateTaskInput): Task | Promise<Task>;

    abstract didTask(id: string): Task | Promise<Task>;

    abstract removeTask(id: string): boolean | Promise<boolean>;

    abstract createUser(createUserInput: CreateUserInput): User | Promise<User>;

    abstract updateUser(id: string, updateUserInput: UpdateUserInput): User | Promise<User>;

    abstract removeUser(id: string): boolean | Promise<boolean>;
}

export class User {
    id: string;
    name: string;
    age: number;
}

type Nullable<T> = T | null;
