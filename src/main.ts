import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  // await app.listen(configService.get("PORT"));
  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: (err) => {
      return new ValidationError();
    }
  }))
  await app.listen(3000);
}
bootstrap();
