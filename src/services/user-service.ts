import { Role } from "../entities/role";
import { Admin } from "../entities/admin";
import { Client } from "../entities/client";
import { Moderator } from "../entities/moderator";
import type { AuthorityUser, User } from "../entities/user";
import type { RoleToUser } from "../entities/role-to-user";
import { Page } from '../entities/page';
import { AVAILABLE_PAGES, AvailablePagesByRole } from '../entities/available-pages';
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

  getAvailableOperations<U extends User, CU extends User>(user: U, currentUser: CU): AvailableOperationsByUser<AuthorityUser, U> {
    try {
      const authorityUser = or(Admin, Moderator)(currentUser);
      return AVAILABLE_OPERATIONS[authorityUser.role][user.role];
    } catch {
      return [];
    }
  }

  getAvailablePages<U extends User>(user: U): AvailablePagesByRole<U> {
    return AVAILABLE_PAGES[user.role];
  }

  isPageAvailableForUser<U extends User, P extends Page>(user: U, page: P): boolean {
    return this.getAvailablePages(user).includes(page);
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
