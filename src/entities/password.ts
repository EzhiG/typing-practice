import * as t from 'runtypes';

const MIN_LENGTH = 3;
const ERROR_MESSAGE = `password length should be more than ${MIN_LENGTH}`;

export const Password = t.String
  .withBrand('Password')
  .withConstraint(value => value.length > MIN_LENGTH || ERROR_MESSAGE);

export type Password = t.Static<typeof Password>;
