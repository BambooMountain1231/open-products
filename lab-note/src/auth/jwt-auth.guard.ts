import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly jwtService: JwtService) {
    super();
    if (!this.jwtService) {
      throw new Error('JWT AUTH GUARD: jwtService is not defined');
    }
  }

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies.JWT;

    if (!token) {
      return false;
    }

    try {
      const decoded = this.jwtService.verify(token);
      request.user = decoded;
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException(info);
    }
    return user;
  }
}
