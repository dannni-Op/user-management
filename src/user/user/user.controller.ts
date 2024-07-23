import { Body, Controller, Delete, Get, Post, Put, } from '@nestjs/common';
import { Auth } from 'src/common/auth/auth.decorator';
import { UserService } from './user.service';
import { WebResponse } from './dto/web';
import { CreateUserDto } from './dto/create-user';
import { User } from './user.entity';
import { UserDto } from './dto/user';
import { LoginUserDto } from './dto/login-user';
import { UpdateUserDto } from './dto/update-user';

@Controller("/api/users")
export class UserController {

  constructor(private userService: UserService) {}

  @Post("/register")
  async register(@Body() request: CreateUserDto): Promise<WebResponse<UserDto>>
  {
    const user: UserDto = await this.userService.register(request); 
    return {
      data: user,
    }
  }

  @Post("/login")
  async login(@Body() request: LoginUserDto): Promise<WebResponse<UserDto>>
  {
    const user: UserDto = await this.userService.login(request); 
    return {
      data: user,
    }
  }

  @Get("/current")
  async get(@Auth() user: User): Promise<WebResponse<UserDto>>
  {
    const result: UserDto = await this.userService.get(user);
    return {
      data: result,
    }
  }

  @Put("/current")
  async put(@Auth() user: User, @Body() request: UpdateUserDto): Promise<WebResponse<UserDto>>
  {
    request.id = user.id;
    const result: UserDto = await this.userService.update(user, request);
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
