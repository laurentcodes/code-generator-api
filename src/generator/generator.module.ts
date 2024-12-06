import { Module } from '@nestjs/common';

// modules
import { UserModule } from 'src/user/user.module';

// controllers
import { GeneratorController } from './generator.controller';

// services
import { GeneratorService } from './generator.service';
import { CodeService } from 'src/code/code.service';

@Module({
  imports: [UserModule],
  controllers: [GeneratorController],
  providers: [GeneratorService, CodeService],
})
export class GeneratorModule {}
