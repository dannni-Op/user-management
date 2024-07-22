import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ZodError } from 'zod';

const PrismaError = Prisma.PrismaClientKnownRequestError;
@Catch( HttpException, ZodError, PrismaError)
export class ErrorFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {

    const response = host.switchToHttp().getResponse();

    if( exception instanceof HttpException)
    {
      response.status(exception.getStatus()).json({
        errors: exception.message,
      });
    }
    else if( exception instanceof PrismaError)
    {
      response.status(400).json({
        errors: "Prisma Error",
      });
    }
    else if( exception instanceof ZodError)
    {
      response.status(400).json({
        errors: "Validation Error",
      });
    }
    else
    {
      response.status(500).json({
        errors: "Internal Error",
      });
    }

  }
}
