import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { LocalAuthGuard } from 'src/modules/auth/local-auth.guard';
import { AuthService } from 'src/modules/auth/auth.service';
import { authenticationDto } from 'src/shared/commands.dto';
import { Public } from './utils/constants';

// App Controller: Handles routes to the auth service

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('api/auth/login')
  async login(@Body() body: authenticationDto) {
    return this.authService.login(body);
  }

  @Public()
  @Post('api/auth/register')
  async register(@Body() body: authenticationDto) {
    return this.authService.registerUser(body);
  }
}
