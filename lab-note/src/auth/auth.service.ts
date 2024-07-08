import { Injectable } from '@nestjs/common';
import { UsersService } from './../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(stNumber: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByStNumber(stNumber);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      username: user.username,
      id: user.id,
      stNumber: user.stNumber,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
