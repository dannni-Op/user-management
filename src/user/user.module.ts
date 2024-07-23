import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { DataSource } from 'typeorm';
import { User } from './user/user.entity';

@Module({
  controllers: [UserController],
  providers: [UserService, {
    provide: "USER_REPOSITORY",
    useFactory: (dataSource: DataSource ) => dataSource.getRepository(User),
    inject: ["DATA_SOURCE"],
  }]
})
export class UserModule {}

