import { createParamDecorator, ExecutionContext, HttpException, SetMetadata } from '@nestjs/common';

export const Auth = createParamDecorator((data: any, ctx: ExecutionContext) => {

  const request = ctx.switchToHttp().getRequest(); 
  if( !request.user ) throw new HttpException("Unauthorized", 401);

  return request.user;
})
