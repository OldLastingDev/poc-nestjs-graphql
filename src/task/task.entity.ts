import { generateUuid } from 'src/libs/uuid';
import type { UserEntity } from 'src/user/user.entity';
import type { IEntity } from 'src/IEntity';

type Properties = {
  readonly uuid: string;
  title: string;
  description: string;
  done: boolean;
  ownerId: string;
  owner?: UserEntity;
  deadlineAt: number;
  readonly createdAt: number;
  updatedAt: number;
  deletedAt?: number;
};

type CreateInput = Pick<
  Properties,
  'title' | 'description' | 'ownerId' | 'deadlineAt'
>;

type UpdateInput = Pick<Properties, 'title' | 'description' | 'deadlineAt'>;

export class TaskEntity implements IEntity {
  private readonly properties: Properties;

  constructor({ title, description, deadlineAt, ownerId }: CreateInput) {
    const now = Date.now();
    this.properties = {
      uuid: generateUuid(),
      title: title,
      description: description,
      done: false,
      ownerId: ownerId,
      deadlineAt: deadlineAt,
      createdAt: now,
      updatedAt: now,
      deletedAt: undefined,
    };
  }

  get uuid(): string {
    return this.properties.uuid;
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

  get deadlineAt(): number | null {
    if (this.properties.deadlineAt === undefined) {
      return null;
    }

    return this.properties.deadlineAt;
  }

  get createdAt(): number {
    return this.properties.createdAt;
  }

  get updatedAt(): number {
    return this.properties.updatedAt;
  }

  // MEMO: いずれ DBMS の責務になる
  private updated(): void {
    this.properties.updatedAt = Date.now();
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
    this.properties.deadlineAt = Date.now();
  }

  untrash(): void {
    this.properties.deletedAt = undefined;
  }

  hasTrashed(): boolean {
    return this.properties.deletedAt !== undefined;
  }
}
