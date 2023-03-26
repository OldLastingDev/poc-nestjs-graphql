type Properties = {
  readonly uuid: string;
  name: string;
  age: number;
};

type UpdatePropertiesInput = {
  name: string;
  age: number;
};

export class UserEntity {
  private readonly properties: Properties;

  constructor(input: Properties) {
    this.properties = input;
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

  update(input: UpdatePropertiesInput) {
    this.properties.name = input.name;
    this.properties.age = input.age;
  }
}
