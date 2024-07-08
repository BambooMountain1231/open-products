import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticlesModule } from './articles/articles.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { jwtConstants } from './auth/constants';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db/database.sqlite',
      entities: ['dist/**/entities/*.js'],
      migrations: ['dist/migrations/**/*.js'],
      synchronize: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ArticlesModule,
    UsersModule,
    AuthModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService, JwtAuthGuard],
})
export class AppModule {}
