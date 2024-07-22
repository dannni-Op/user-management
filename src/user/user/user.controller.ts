import { Body, Controller, Delete, Get, Post, Put, } from '@nestjs/common';
import { Auth } from 'src/common/auth/auth.decorator';
import { UserService } from './user.service';
import { LoginUserRequest, RegisterUserRequest, UserResponse, UpdateUserRequest } from 'src/model/user.model';
import { WebResponse } from 'src/model/web.model';
import { User } from '@prisma/client';

@Controller("/api/users")
export class UserController {

  constructor(private userService: UserService) {}

  @Post("/register")
  async register(@Body() request: RegisterUserRequest): Promise<WebResponse<UserResponse>>
  {
    const user: UserResponse = await this.userService.register(request); 
    return {
      data: user,
    }
  }

  @Post("/login")
  async login(@Body() request: LoginUserRequest): Promise<WebResponse<UserResponse>>
  {
    const user: UserResponse = await this.userService.login(request); 
    return {
      data: user,
    }
  }

  @Get("/current")
  async get(@Auth() user: User): Promise<WebResponse<UserResponse>>
  {
    const result: UserResponse = await this.userService.get(user);
    return {
      data: result,
    }
  }

  @Put("/current")
  async put(@Auth() user: User, @Body() request: UpdateUserRequest): Promise<WebResponse<UserResponse>>
  {
    const result: UserResponse = await this.userService.update(user, request);
    return {
      data: result,
    }
  }

  @Delete("/current")
  async logout(@Auth() user: User): Promise<WebResponse<string>>
  {
    const result = await this.userService.logout(user);
    return {
      data: "OK",
    }
  }
}
