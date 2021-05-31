import * as t from 'runtypes';

const PATTERN = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/;
const PLACEHOLDER = '#value#';
const ERROR_MESSAGE = `"${PLACEHOLDER}" is not an email!`;

export const Email = t.String
  .withBrand('Email')
  .withConstraint(value => PATTERN.test(value) || ERROR_MESSAGE.replace(PLACEHOLDER, value));

export type Email = t.Static<typeof Email>;
