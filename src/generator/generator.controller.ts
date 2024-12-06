import {
  Controller,
  Request,
  Body,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';

// guards
import { AuthGuard } from 'src/guards/auth.guard';

// services
import { GeneratorService } from './generator.service';

@UseGuards(AuthGuard)
@Controller('generator')
export class GeneratorController {
  constructor(private generatorService: GeneratorService) {}

  @Get('get-code')
  async getCode(@Request() req) {
    return this.generatorService.getCode(req.user.id);
  }

  @Post('verify-code')
  async verifyCode(@Request() req, @Body() body) {
    return this.generatorService.verifyCode(req.user.id, body.code);
  }
}
