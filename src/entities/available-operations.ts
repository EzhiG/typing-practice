import { Role } from "./role";
import { Operation } from "./operation";
import { User } from "./user";

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
  [Role.CLIENT]: {
    [Role.ADMIN]: [],
    [Role.MODERATOR]: [],
    [Role.CLIENT]: [],
  },
};

export type AvailableOperations = typeof AVAILABLE_OPERATIONS;
export type AvailableOperationsByUser<CU extends User, U extends User> = AvailableOperations[CU['role']][U['role']];

