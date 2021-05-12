export class Password {
  static of(value: any): Password {
    if (value instanceof Password) {
      return value;
    }
    throw new TypeError("value is not an instance of Password!");
  }

  private static validate(value: any): value is string {
    return typeof value === 'string' && value.length > 3;
  }

  static from(value: any): Password {
    if (this.validate(value)) {
      return new Password(value);
    }
    throw new TypeError("value is not a password!");
  }

  private readonly _type = Symbol("Password");

  protected constructor(public readonly value: string) {}
}
