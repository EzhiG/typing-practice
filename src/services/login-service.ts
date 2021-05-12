import UserService from './user-service';
import type { User } from '../entities/user';
import type { Email } from '../entities/email';
import type { Password } from '../entities/password';

export default class LoginService {
  constructor(private readonly userService: UserService) {}

  public async login(email: Email, password: Password): Promise<User> {
    return await this.getUserByCredentials(email, password);
  }

  private async getUserByCredentials(email: Email, password: Password): Promise<User> {
    const users = await this.userService.getAllUsers();
    const candidate = users.find(u => (u.email === email.value && u.password === password.value));

    if (!candidate) {
      throw new Error("User not found");
    }

    return candidate;
  }

  public async logout(): Promise<void> {
    return Promise.resolve();
  }
}
