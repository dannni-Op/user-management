import { IsString, Length, IsNumber, IsEmail, IsOptional, IsNotEmpty } from "class-validator";

export class UpdateUserDto {

  @IsNumber()
  @IsOptional()
  id: number;

  @IsString()
  @IsOptional()
  @Length(1, 255)
  username?: string;

  @IsString()
  @IsOptional()
  @Length(1, 255)
  password?: string;

  @IsString()
  @IsOptional()
  @Length(1, 255)
  name?: string;

  @IsEmail()
  @IsOptional()
  @Length(1, 255)
  email?: string;
}
