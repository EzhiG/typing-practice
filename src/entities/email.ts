export class Email {
  private static pattern = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/;

  static of(value: any): Email {
    if (value instanceof Email) {
      return value;
    }
    throw new TypeError("value is not an instance of Email!");
  }

  private static validate(value: any): value is string {
    return typeof value === 'string' && this.pattern.test(value);
  }


  static from(value: any): Email {
    if (this.validate(value)) {
      return new Email(value);
    }
    throw new TypeError("value is not an email!");
  }

  private readonly _type = Symbol("Email");

  protected constructor(public readonly value: string) {}
}
