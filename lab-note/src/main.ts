import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as session from 'express-session';
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import { jwtConstants } from './auth/constants';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const pathOfPublic = join(__dirname, '..', 'public');
  const pathOfViews = join(__dirname, '..', 'views');

  app.use(cookieParser(process.env.COOKIE_SECRET || jwtConstants.secret));
  app.useStaticAssets(pathOfPublic);
  app.setBaseViewsDir(pathOfViews);
  app.setViewEngine('ejs');

  app.use(
    session({
      secret: jwtConstants.secret || process.env.COOKIE_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 2 * 60 * 1000,
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3000);
}
bootstrap();
