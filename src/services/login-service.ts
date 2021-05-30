import UserService from './user-service';
import type { User } from '../entities/user';
import type { Email } from '../entities/email';
import type { Password } from '../entities/password';

export default class LoginService {
  constructor(private readonly userService: UserService) {}

  public async login(email: Email, password: Password): Promise<User> {
    return await this.userService.getUserByCredentials(email, password);
  }

  public async logout(): Promise<void> {
    return Promise.resolve();
  }
}
