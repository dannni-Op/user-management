import { IsEmail, IsNotEmpty, IsString, Length, Min } from "class-validator";

export class CreateUserDto {

  @IsString()
  @Length(1, 255)
  username: string;

  @IsString()
  @Length(1, 255)
  password: string;

  @IsString()
  @Length(1, 255)
  name: string;

  @IsEmail()
  @Length(1, 255)
  email: string;
}
