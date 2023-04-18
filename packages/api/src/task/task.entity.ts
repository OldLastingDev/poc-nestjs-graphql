import { generateUlid } from 'src/libs/ulid';

import type { IEntity } from 'src/interfaces/IEntity';
import type { ULID } from 'src/libs/ulid';
import type { UserEntity } from 'src/user/user.entity';

type AllProperties = {
  readonly id?: number;
  readonly ulid: ULID;
  title: string;
  description: string;
  done: boolean;
  deadlineAt?: Date;
  ownerId: number;
  readonly createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
};

type CreateInput = Pick<AllProperties, 'title' | 'description' | 'deadlineAt'>;

type UpdateInput = Pick<AllProperties, 'title' | 'description' | 'deadlineAt'>;

export class TaskEntity implements IEntity {
  static new(
    { title, description, deadlineAt }: CreateInput,
    owner: UserEntity,
  ): TaskEntity {
    const now = new Date();
    return new TaskEntity({
      ulid: generateUlid(),
      title: title,
      description: description,
      done: false,
      deadlineAt: deadlineAt,
      ownerId: owner._id,
      createdAt: now,
      updatedAt: now,
    });
  }

  static factoryWithAllProperties(properties: AllProperties): TaskEntity {
    return new TaskEntity(properties);
  }

  private constructor(private readonly properties: AllProperties) {}

  hasPerpetuated(): boolean {
    return this.properties.id !== undefined;
  }

  get _id(): number {
    if (this.properties.id === undefined) {
      this.throwNeverBeenPerpetuatedError();
    }

    return this.properties.id;
  }

  get ulid(): ULID {
    return this.properties.ulid;
  }

  get title(): string {
    return this.properties.title;
  }

  get description(): string {
    return this.properties.description;
  }

  get done(): boolean {
    return this.properties.done;
  }

  get deadlineAt(): Date | undefined {
    return this.properties.deadlineAt;
  }

  get ownerId(): number {
    return this.properties.ownerId;
  }

  get createdAt(): Date {
    return this.properties.createdAt;
  }

  get updatedAt(): Date {
    return this.properties.updatedAt;
  }

  get deletedAt(): Date | undefined {
    return this.properties.deletedAt;
  }

  private throwNeverBeenPerpetuatedError(): never {
    throw new Error('[TaskEntity] This entity has never been perpetuated.');
  }

  // MEMO: いずれ DBMS の責務になる
  private updated(): void {
    this.properties.updatedAt = new Date();
  }

  did(): void {
    this.properties.done = true;
    this.updated();
  }

  undo(): void {
    this.properties.done = false;
    this.updated();
  }

  update(input: UpdateInput): void {
    this.properties.title = input.title;
    this.properties.description = input.description;
    this.properties.deadlineAt = input.deadlineAt;
    this.updated();
  }

  trash(): void {
    this.properties.deadlineAt = new Date();
    this.updated();
  }

  untrash(): void {
    this.properties.deletedAt = undefined;
    this.updated();
  }

  hasTrashed(): boolean {
    return this.properties.deletedAt !== undefined;
  }
}
