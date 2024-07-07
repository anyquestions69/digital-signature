import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  register(@Body() createAuthDto: RegisterDto) {
    return this.authService.register(createAuthDto);
  }

  @Post('/login')
  create(@Body() createAuthDto: LoginDto) {
    return this.authService.login(createAuthDto);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('/profile')
  profile(@Request() req) {
    return this.authService.profile(req);
  }
}
