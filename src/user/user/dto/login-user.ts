import { IsString, Length } from "class-validator";

export class LoginUserDto {

  @IsString()
  @Length(1, 255)
  username: string;

  @IsString()
  @Length(1, 255)
  password: string;
}
