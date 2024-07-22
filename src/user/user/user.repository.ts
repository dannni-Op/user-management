import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { RegisterUserRequest, UpdateUserRequest } from 'src/model/user.model';
import { User } from '@prisma/client';

@Injectable()
export class UserRepository {

  constructor(private prismaService: PrismaService) {}

  //fungsi tambah data
  async register(user: RegisterUserRequest): Promise<User>
  {
    const result = await this.prismaService.user.create({
      data: user,
    });

    return result;
  }

  //fungsi untuk ambil data dari username
  async getByUsername (username: string): Promise<User>
  {
    const result = await this.prismaService.user.findUnique({
      where: {
        username: username,
      }
    });

    return result;
  }

  //fungsi untuk set token pada user login
  async setToken(userId: number, token: string): Promise<User>
  {
    const result = await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        token,
      }
    });

    return result;
  }

  //fungsi update user
  async update(userId: number, user: UpdateUserRequest): Promise<User>
  {
    const result: User = await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: user,
    });

    return result;
  }

  //fungsi hapus token dari user login
  async deleteToken(userId: number): Promise<User>
  {
    const user = await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        token: null,
      }
    });

    return user;
  }
}
