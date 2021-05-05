import { StringLiteral } from './string-literal';

export class Email extends StringLiteral {
  private static pattern = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/;

  static of(value: StringLiteral): Email {
    if (value instanceof Email) {
      return value;
    }
    throw new TypeError("value is not an instance of Email!");
  }

  private static validate(value: string): boolean {
    return this.pattern.test(value);
  }


  static from(value: any): Email {
    if (StringLiteral.is(value) && this.validate(value)) {
      return new Email(value);
    }
    throw new TypeError("value is not an email!");
  }

  private readonly _type = Symbol("Email");

  protected constructor(value: string) {
    super(value);
  }
}
