import type { Admin } from "./admin";
import type { Client } from "./client";
import type { Moderator } from "./moderator";

export type AuthorityUser = Moderator | Admin;

export type User = Admin | Moderator | Client;
