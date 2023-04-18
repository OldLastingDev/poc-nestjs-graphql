
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface CreateTaskInput {
    title: string;
    description: string;
    deadlineAt?: Nullable<number>;
}

export interface UpdateTaskInput {
    title: string;
    description: string;
    deadlineAt?: Nullable<number>;
}

export interface CreateUserInput {
    name: string;
    age: number;
}

export interface UpdateUserInput {
    name: string;
    age: number;
}

export interface Task {
    id: string;
    title: string;
    description: string;
    done: boolean;
    owner: User;
    deadlineAt?: Nullable<number>;
}

export interface IQuery {
    tasks(userId: string): Nullable<Task>[] | Promise<Nullable<Task>[]>;
    task(id: string): Nullable<Task> | Promise<Nullable<Task>>;
    users(): Nullable<User>[] | Promise<Nullable<User>[]>;
    user(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export interface IMutation {
    createTask(createTaskInput: CreateTaskInput, userId: string): Task | Promise<Task>;
    updateTask(updateTaskInput: UpdateTaskInput): Task | Promise<Task>;
    didTask(id: string): Task | Promise<Task>;
    undoTask(id: string): Task | Promise<Task>;
    removeTask(id: string): boolean | Promise<boolean>;
    createUser(createUserInput: CreateUserInput): User | Promise<User>;
    updateUser(id: string, updateUserInput: UpdateUserInput): User | Promise<User>;
    removeUser(id: string): boolean | Promise<boolean>;
}

export interface User {
    id: string;
    name: string;
    age: number;
    tasks: Nullable<Task>[];
}

type Nullable<T> = T | null;
