import { HttpException, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDto } from './dto/user';
import { CreateUserDto } from './dto/create-user';
import { LoginUserDto } from './dto/login-user';
import { UpdateUserDto } from './dto/update-user';

@Injectable()
export class UserService {

  constructor(@Inject("USER_REPOSITORY") private userRepository: Repository<User>) {}

  toUserResponse(user: User ): UserDto
  {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
    }
  }

  async register(request: CreateUserDto ): Promise<UserDto>
  {
    //check username unique
    const userExist = await this.userRepository.findOne({
      where: {
        username: request.username
      }
    });
    if( userExist ) throw new HttpException("Username already exist!", 400);

    //hash password
    request.password = await bcrypt.hash(request.password, 10);

    //kembalikan data user
    const createRequest = new User();
    createRequest.username = request.username;
    createRequest.password = request.password;
    createRequest.name = request.name;
    createRequest.email = request.email;

    const user: User = await this.userRepository.save(request);
    return this.toUserResponse(user);
  }

  async login(request: LoginUserDto): Promise<UserDto>
  {
    //check ada username atau tidak
    let user: User | null = await this.userRepository.findOne({
      where: {
        username: request.username,
      }
    });
    if( !user ) throw new HttpException("Username or password is wrong!", 400);

    //password body, password in db
    const checkPassword = await bcrypt.compare(request.password, user.password)
    if( !checkPassword ) throw new HttpException("Username or password is wrong!", 400);

    const token = uuid();

    //setToken
    let data = await this.userRepository.update({
      username: request.username,
    }, {
      token: token,
    });

    const result: UserDto = this.toUserResponse(user);
    result.token = token;

    return result;
  }

  async get(user: User): Promise<UserDto>
  {
    //langsung kembalikan data dari auth
    return this.toUserResponse(user);
  }

  async update(user: User, request: UpdateUserDto): Promise<UserDto>
  {
    if( request.username )
    {
      //check username supaya username tetap unik
      const userExist = await this.userRepository.findOne({
        where: {
          username: request.username,
        }
      });
      if( userExist && request.username != user.username ) throw new HttpException("Username already exist!", 400);
    }

    if(request.password)
    {
      //hash password baru
      request.password = await bcrypt.hash(request.password, 10);
    }

    //kembalikan data user;
    const result = await this.userRepository.update(user.id, request);
    const data = await this.userRepository.findOne({
      where: {
        id: user.id,
      }
    })
    return this.toUserResponse(data);
  }

  async logout(user: User): Promise<string>
  {
    //hapus token 
    const result = await this.userRepository.update(user.id, {
      token: null,
    });
    return "OK";
  }
}


