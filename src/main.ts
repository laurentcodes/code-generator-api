import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { TransformInterceptor } from './interceptors/transform.interceptor';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // General
  app.enableCors();

  // Interceptors
  app.useGlobalInterceptors(new TransformInterceptor());

  // Pipes
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
