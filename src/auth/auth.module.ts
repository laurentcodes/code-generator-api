import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';

// modules
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';

// services
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
// import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
