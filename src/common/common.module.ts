import { Module, Global, NestModule, MiddlewareConsumer, } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ValidationService } from './validation/validation.service';
import { APP_FILTER } from '@nestjs/core';
import { ErrorFilter } from './error/error.filter';
import { AuthMiddleware } from './auth/auth.middleware';

@Global()
@Module({
  providers: [PrismaService, ValidationService, {
    provide: APP_FILTER,
    useClass: ErrorFilter,
  }],
  exports: [PrismaService, ValidationService],
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer)
  {
    consumer.apply(AuthMiddleware).forRoutes("/api/users/*");
  }

}
