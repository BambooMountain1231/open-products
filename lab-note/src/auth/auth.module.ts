import { Module } from '@nestjs/common';
import { UsersModule } from './../users/users.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { jwtConstants } from './constants';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Module({
  imports: [
    UsersModule,
    // PassportModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret || process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    JwtAuthGuard,
    LocalAuthGuard,
  ],
  controllers: [AuthController],
  exports: [AuthService, JwtAuthGuard, LocalAuthGuard],
})
export class AuthModule {}
