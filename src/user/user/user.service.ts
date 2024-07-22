import { HttpException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { LoginUserRequest, RegisterUserRequest, UpdateUserRequest, UserResponse } from 'src/model/user.model';
import { ValidationService } from 'src/common/validation/validation.service';
import { UserValidation } from './user.validation';
import * as bcrypt from "bcrypt";
import { User } from '@prisma/client';
import { v4 as uuid } from "uuid";

@Injectable()
export class UserService {

  constructor(private userRepository: UserRepository, private validationService: ValidationService) {}

  toUserResponse(user: User): UserResponse
  {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
    }
  }

  async register(request: RegisterUserRequest ): Promise<UserResponse>
  {
    //validasi request body
    const registerRequest = this.validationService.validate(UserValidation.CREATE, request);

    //check username unique
    const userExist = await this.userRepository.getByUsername(request.username);
    if( userExist ) throw new HttpException("Username already exist!", 400);

    //hash password
    request.password = await bcrypt.hash(request.password, 10);

    //kembalikan data user
    const user: User = await this.userRepository.register(request);
    return this.toUserResponse(user);
  }

  async login(request: LoginUserRequest): Promise<UserResponse>
  {
    //validasi request body
    const loginRequest = this.validationService.validate(UserValidation.LOGIN, request);

    //check ada username atau tidak
    let user: User | null = await this.userRepository.getByUsername(request.username);
    if( !user ) throw new HttpException("Username or password is wrong!", 400);

    //password body, password in db
    const checkPassword = await bcrypt.compare(request.password, user.password)
    if( !checkPassword ) throw new HttpException("Username or password is wrong!", 400);

    const token = uuid();

    //setToken
    user = await this.userRepository.setToken(user.id, token);
    const result: UserResponse = this.toUserResponse(user);
    result.token = token;

    return result;
  }

  async get(user: User): Promise<UserResponse>
  {
    //langsung kembalikan data dari auth
    return this.toUserResponse(user);
  }

  async update(user: User, request: UpdateUserRequest): Promise<UserResponse>
  {
    //validasi request body
    const updateRequest = this.validationService.validate(UserValidation.UPDATE, request);

    if( request.username )
    {
      //check username supaya username tetap unik
      const userExist = await this.userRepository.getByUsername(request.username);
      if( userExist && request.username != user.username ) throw new HttpException("Username already exist!", 400);
    }

    if(request.password)
    {
      //hash password baru
      request.password = await bcrypt.hash(request.password, 10);
    }

    //kembalikan data user;
    const result = await this.userRepository.update(user.id, request);
    return this.toUserResponse(result);
  }

  async logout(user: User): Promise<string>
  {
    //hapus token 
    const result = await this.userRepository.deleteToken(user.id);
    return "OK";
  }
}


