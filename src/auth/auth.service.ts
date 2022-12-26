import { Injectable } from '@nestjs/common';
import { UserWithoutPassword } from 'src/users/schemas/user.schema';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserWithoutPassword | null> {
    const user = await this.usersService.findByEmailWithPassword(email);
    console.log({ user });
    if (user && user.password === password) {
      return this.usersService.findByEmail(email);
    }
    return null;
  }
}
