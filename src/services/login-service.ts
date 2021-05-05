import UserService from './user-service';
import { User } from '../entities/user';
import { Email } from '../entities/email';
import { Password } from '../entities/password';

export default class LoginService {
  constructor(private readonly userService: UserService) {}

  public async login(email: any, password: any): Promise<User> {
    return await this.getUserByCredentials(Email.from(email), Password.from(password));
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
