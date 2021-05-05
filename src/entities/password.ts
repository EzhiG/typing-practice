import { StringLiteral } from './string-literal';

export class Password extends StringLiteral {
  static of(value: StringLiteral): Password {
    if (value instanceof Password) {
      return value;
    }
    throw new TypeError("value is not an instance of Password!");
  }

  private static validate(value: string): boolean {
    return value.length > 3;
  }

  static from(value: any): Password {
    if (StringLiteral.is(value) && this.validate(value)) {
      return new Password(value);
    }
    throw new TypeError("value is not a password!");
  }

  private readonly _type = Symbol("Password");

  protected constructor(value: string) {
    super(value);
  }
}
