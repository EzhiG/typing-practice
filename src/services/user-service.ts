import { Role } from "../entities/role";
import { Admin } from "../entities/admin";
import { Client } from "../entities/client";
import { Moderator } from "../entities/moderator";
import type { AuthorityUser, User } from "../entities/user";
import type { RoleToUser } from "../entities/role-to-user";
import { AVAILABLE_OPERATIONS } from '../entities/available-operations';
import type { AvailableOperationsByUser } from '../entities/available-operations';
import or from '../utils/or';

export default class UserService {
  private users: readonly User[] = [];

  async getAllUsers(): Promise<readonly User[]> {
    if (this.users.length !== 0) {
      return this.users;
    }
    const response = await this.fetch();
    this.users = response.default.map((u: any) => {
      const User = this.getConstructorByRole(u.role);
      return User.from(u);
    });
    return this.users;
  }

  private fetch(): Promise<any> {
    return import("../mocks/users.json");
  }

  async updateUserRole<R extends Role>(
    user: Readonly<RoleToUser[R]>,
    newRole: R
  ) {
    const User = this.getConstructorByRole(newRole);
    this.users = this.users.map((u) => (u.id === user.id ? User.from(u) : u));
    return this.users;
  }

  getAvailableOperations<U extends User, CU extends User>(user: U, currentUser: CU) {
    const authorityUser = or(Admin, Moderator)(currentUser);
    return this.getAuthorityAvailableOperations(user, authorityUser);
  }

  private getAuthorityAvailableOperations<U extends User, A extends AuthorityUser>(user: U, authorityUser: A): AvailableOperationsByUser<A, U> {
    return AVAILABLE_OPERATIONS[authorityUser.role][user.role];
  }

  getConstructorByRole(role: Role) {
    switch (role) {
      case Role.ADMIN:
        return Admin;
      case Role.CLIENT:
        return Client;
      case Role.MODERATOR:
        return Moderator;
    }
  }
}
