import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';

// guards
import { AuthGuard } from 'src/guards/auth.guard';

// services
import { AuthService } from './auth.service';

// dto
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Request() req, @Body() body: CreateUserDto) {
    return await this.authService.register(body.account, body.password);
  }

  @Post('login')
  async login(@Request() req, @Body() body: CreateUserDto) {
    return await this.authService.login(body.account, body.password);
  }
}
