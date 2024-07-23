import { IsOptional, IsString } from "class-validator";

export class WebResponse<T> {
  data: T;

  @IsString()
  @IsOptional()
  errors?: string;
}
