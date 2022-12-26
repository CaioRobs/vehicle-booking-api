import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UserWithoutPassword } from 'src/users/schemas/user.schema';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserWithoutPassword | null> {
    const user = await this.usersService.findByEmailWithPassword(email);
    if (user && user.password === password) {
      return this.usersService.findByEmail(email);
    }
    return null;
  }

  async login(user: User): Promise<{ access_token: string }> {
    const payload = {
      email: user.email,
      username: user.username,
      name: user.name,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
