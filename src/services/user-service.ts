import { Role } from "../entities/role";
import { User } from "../entities/user";
import { castTo } from "../entities/role-to-user";
import { Email } from '../entities/email';
import { Password } from '../entities/password';
import type { RoleToUser } from "../entities/role-to-user";
import { Page } from '../entities/page';
import { AVAILABLE_PAGES, AvailablePagesByRole } from '../entities/available-pages';
import { AVAILABLE_OPERATIONS } from '../entities/available-operations';
import type { AvailableOperationsByUser } from '../entities/available-operations';

export default class UserService {
  private users: readonly User[] = [];

  async getAllUsers(): Promise<readonly User[]> {
    if (this.users.length !== 0) {
      return this.users;
    }
    const response = await this.fetch();
    this.users = response.default.map((u: any) => User.check(u));
    return this.users;
  }

  async getUserByCredentials(email: Email, password: Password): Promise<User> {
    const users = await this.getAllUsers();
    const candidate = users.find(u => (u.email === email.value && u.password === password.value));

    if (!candidate) {
      throw new Error("User not found");
    }

    return candidate;
  }

  private fetch(): Promise<any> {
    return import("../mocks/users.json");
  }

  async updateUserRole<R extends Role>(
    user: RoleToUser[R],
    newRole: R
  ) {
    const newUser = castTo(newRole, user);
    this.users = this.users.map((u) => (u.id === user.id ? newUser : u));
    return this.users;
  }

  getAvailableOperations<U extends User, CU extends User>(user: U, currentUser: CU): AvailableOperationsByUser<CU, U> {
    return AVAILABLE_OPERATIONS[currentUser.role][user.role];
  }

  getAvailablePages<U extends User>(user: U): AvailablePagesByRole<U> {
    return AVAILABLE_PAGES[user.role];
  }

  isPageAvailableForUser<U extends User, P extends Page>(user: U, page: P): boolean {
    return this.getAvailablePages(user).includes(page);
  }
}
