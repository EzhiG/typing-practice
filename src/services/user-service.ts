import { Role } from "../entities/role";
import { Admin } from "../entities/admin";
import { Client } from "../entities/client";
import { Moderator } from "../entities/moderator";
import { Operation } from "../entities/operation";
import type { PermittedUser, User } from "../entities/user";
import type { RoleToUser } from "../entities/role-to-user";

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

  getAvailableOperations(user: User, currentUser: PermittedUser): Operation[] {
    if (currentUser instanceof Moderator) {
      return this.getModeratorAvailableOperations(user);
    }

    return this.getAdminAvailableOperations(user);
  }

  private getModeratorAvailableOperations(user: User): Operation[] {
    if (user instanceof Admin) {
      return [];
    }

    if (user instanceof Client) {
      return [Operation.UPDATE_TO_MODERATOR];
    }

    return [Operation.UPDATE_TO_CLIENT];
  };

  private getAdminAvailableOperations(user: User): Operation[] {
    if (user instanceof Admin || user instanceof Client) {
      return [Operation.UPDATE_TO_MODERATOR];
    }

    return [Operation.UPDATE_TO_CLIENT, Operation.UPDATE_TO_ADMIN];
  };

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
