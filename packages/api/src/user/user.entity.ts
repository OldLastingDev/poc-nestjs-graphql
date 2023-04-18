import { ULID, generateUlid } from 'src/libs/ulid';

import type { IEntity } from 'src/interfaces/IEntity';

type EssentialProperties = {
  readonly ulid: ULID;
  name: string;
  age: number;
};

type AllProperties = EssentialProperties & {
  readonly id?: number;

  readonly createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

type UpdateInput = Pick<AllProperties, 'name' | 'age'>;
type CreateInput = Pick<AllProperties, 'name' | 'age'>;

export class UserEntity implements IEntity {
  private constructor(private readonly properties: AllProperties) {}

  static new({ name, age }: CreateInput): UserEntity {
    const properties: AllProperties = {
      ulid: generateUlid(),
      name: name,
      age: age,
    };
    return new UserEntity(properties);
  }

  static factoryWithAllProperties(properties: AllProperties) {
    return new UserEntity(properties);
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

  get name(): string {
    return this.properties.name;
  }

  get age(): number {
    return this.properties.age;
  }

  get createdAt(): Date {
    if (this.properties.createdAt === undefined) {
      this.throwNeverBeenPerpetuatedError();
    }

    return this.properties.createdAt;
  }

  get updatedAt(): Date {
    if (this.properties.updatedAt === undefined) {
      this.throwNeverBeenPerpetuatedError();
    }

    return this.properties.updatedAt;
  }

  get deletedAt(): Date | undefined {
    return this.properties.deletedAt;
  }

  private throwNeverBeenPerpetuatedError(): never {
    throw new Error('[UserEntity] This entity has never been perpetuated.');
  }

  // MEMO: いずれ DBMS の責務になる
  private updated(): void {
    if (this.properties.updatedAt === undefined) {
      this.throwNeverBeenPerpetuatedError();
    }
    this.properties.updatedAt = new Date();
  }

  hasPerpetuated(): boolean {
    return this.properties.id !== undefined;
  }

  update(input: UpdateInput) {
    this.properties.name = input.name;
    this.properties.age = input.age;
    this.updated();
  }

  trash(): void {
    this.properties.deletedAt = new Date();
    this.updated();
  }

  untrash(): void {
    this.properties.deletedAt = undefined;
  }

  hasTrashed(): boolean {
    return this.properties !== undefined;
  }
}
