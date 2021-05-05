import { Role } from "./role";
import { Operation } from "./operation";
import type { AuthorityUser, User } from "./user";

export const AVAILABLE_OPERATIONS = {
  [Role.ADMIN]: {
    [Role.ADMIN]: [Operation.UPDATE_TO_MODERATOR],
    [Role.MODERATOR]: [Operation.UPDATE_TO_ADMIN, Operation.UPDATE_TO_CLIENT],
    [Role.CLIENT]: [Operation.UPDATE_TO_MODERATOR],
  },
  [Role.MODERATOR]: {
    [Role.ADMIN]: [],
    [Role.MODERATOR]: [Operation.UPDATE_TO_CLIENT],
    [Role.CLIENT]: [Operation.UPDATE_TO_MODERATOR],
  },
};

export type AvailableOperations = typeof AVAILABLE_OPERATIONS;
export type AvailableOperationsByUser<A extends AuthorityUser, U extends User> = AvailableOperations[A['role']][U['role']];

