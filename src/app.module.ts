import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UserModule, CommonModule, ConfigModule.forRoot({
    isGlobal: true,
  })],
  controllers: [],
  providers: [],
})
export class AppModule {}
