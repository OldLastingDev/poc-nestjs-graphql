import { generateUlid } from 'src/libs/ulid';

import type { UserEntity } from 'src/user/user.entity';
import type { IEntity } from 'src/interfaces/IEntity';
import type { ULID } from 'src/libs/ulid';

type Properties = {
  readonly id?: number;
  readonly ulid: ULID;
  title: string;
  description: string;
  done: boolean;
  ownerId: string;
  owner?: UserEntity;
  deadlineAt?: Date;
  readonly createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
};

type CreateInput = Pick<
  Properties,
  'title' | 'description' | 'ownerId' | 'deadlineAt'
>;

type UpdateInput = Pick<Properties, 'title' | 'description' | 'deadlineAt'>;

export class TaskEntity implements IEntity {
  private readonly properties: Properties;

  constructor({ title, description, deadlineAt, ownerId }: CreateInput) {
    const now = new Date();
    this.properties = {
      ulid: generateUlid(),
      title: title,
      description: description,
      done: false,
      ownerId: ownerId,
      deadlineAt: deadlineAt,
      createdAt: now,
      updatedAt: now,
    };
  }

  hasPerpetuated(): boolean {
    throw new Error('Method not implemented.');
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

  get ownerId(): string {
    return this.properties.ownerId;
  }

  /**
   * Task を作成したユーザー
   * @throws User を Eager loading していないとエラーが発生する
   */
  get owner(): UserEntity {
    if (this.properties.owner === undefined) {
      throw new Error('No loaded entity');
    }

    return this.properties.owner;
  }

  get deadlineAt(): Date | null {
    if (this.properties.deadlineAt === undefined) {
      return null;
    }

    return this.properties.deadlineAt;
  }

  get createdAt(): Date {
    return this.properties.createdAt;
  }

  get updatedAt(): Date {
    return this.properties.updatedAt;
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
