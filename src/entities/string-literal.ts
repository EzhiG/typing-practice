export class StringLiteral {
  public static is(value: any): value is string {
    return typeof value === 'string';
  }

  protected constructor(
    public readonly value: string,
  ) {}
}
