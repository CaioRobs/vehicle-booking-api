import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserWithoutPassword } from 'src/users/schemas/user.schema';
import { UsersService } from '../users/users.service';
import { IPayload } from './interface/Payload.interface';

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

  async login(user: UserWithoutPassword): Promise<{ access_token: string }> {
    const payload: IPayload = {
      email: user.email,
      username: user.username,
      name: user.name,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
