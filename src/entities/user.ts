import type { Admin } from "./admin";
import type { Client } from "./client";
import type { Moderator } from "./moderator";

export type PermittedUser = Admin | Moderator;
export type User = PermittedUser | Client;
