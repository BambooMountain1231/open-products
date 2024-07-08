import {
  Controller,
  UseGuards,
  Req,
  Post,
  Get,
  Render,
  Res,
} from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request, @Res() res: Response) {
    const JwtToken = this.authService.login(req.user);
    res.cookie('JWT', (await JwtToken).access_token, { httpOnly: true });
    return res.redirect('/articles');
  }

  @Post('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    req.logout((err) => {
      if (err) {
        throw err;
      }
    });
    res.clearCookie('JWT');
    return res.redirect('/auth');
  }

  @Get()
  @Render('session/login')
  loginPage() {
    return { result: 'OK' };
  }

  @Get('signup')
  @Render('session/signup')
  signupPage() {
    return { result: 'OK' };
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req) {
    return req.user;
  }
}
