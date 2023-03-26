import { IEntity } from 'src/IEntity';
import { generateUuid } from 'src/libs/uuid';

type Properties = {
  readonly uuid: string;
  name: string;
  age: number;
  readonly createdAt: number;
  updatedAt: number;
  deletedAt?: number;
};

type UpdateInput = Pick<Properties, 'name' | 'age'>;
type CreateInput = Pick<Properties, 'name' | 'age'>;

export class UserEntity implements IEntity {
  private readonly properties: Properties;

  constructor({ name, age }: CreateInput) {
    const now = Date.now();
    this.properties = {
      uuid: generateUuid(),
      name: name,
      age: age,
      createdAt: now,
      updatedAt: now,
    };
  }

  get uuid(): string {
    return this.properties.uuid;
  }

  get name(): string {
    return this.properties.name;
  }

  get age(): number {
    return this.properties.age;
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

  update(input: UpdateInput) {
    this.properties.name = input.name;
    this.properties.age = input.age;
    this.updated();
  }

  trash(): void {
    this.properties.deletedAt = Date.now();
    this.updated();
  }

  untrash(): void {
    this.properties.deletedAt = undefined;
  }

  hasTrashed(): boolean {
    return this.properties !== undefined;
  }
}
