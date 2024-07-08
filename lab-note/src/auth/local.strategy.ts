import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'stNumber' });
  }

  async validate(stNumber: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(stNumber, password);
    if (!user) {
      throw new UnauthorizedException(
        '学生番号またはパスワードが間違っています',
      );
    }
    return user;
  }
}
