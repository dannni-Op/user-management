import { Module, Global, NestModule, MiddlewareConsumer, } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ErrorFilter } from './error/error.filter';
import { AuthMiddleware } from './auth/auth.middleware';
import { Database } from './database/database';

@Global()
@Module({
  providers: [{
    provide: APP_FILTER,
    useClass: ErrorFilter,
  }, Database],
  exports: [Database],
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer)
  {
    consumer.apply(AuthMiddleware).forRoutes("/api/users/*");
  }

}
