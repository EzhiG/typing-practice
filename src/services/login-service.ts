import UserService from './user-service';
import { PermittedUser, User } from '../entities/user';
import { Admin } from '../entities/admin';
import { Moderator } from '../entities/moderator';
import or from '../utils/or';

export default class LoginService {
  private loggedInUser: PermittedUser | null = null;

  constructor(private readonly userService: UserService) {}

  public async login(email: string, password: string): Promise<PermittedUser> {
    const candidate = await this.getUserByCredentials(email, password);
    this.checkUserRights(candidate);
    this.loggedInUser = candidate;

    return this.loggedInUser;
  }

  private checkUserRights(user: User): asserts user is PermittedUser {
    const adminOrModerator = or(Admin, Moderator);
    adminOrModerator(user);
  }

  private async getUserByCredentials(email: string, password: string): Promise<User> {
    const users = await this.userService.getAllUsers();
    const candidate = users.find(u => (u.email === email && u.password === password));

    if (!candidate) {
      throw Error("User not found");
    }

    return candidate;
  }

  public async logout(): Promise<void> {
    this.loggedInUser = null;
    return Promise.resolve();
  }
}
