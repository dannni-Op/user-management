import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { ValidationError } from "class-validator";

@Catch( HttpException, ValidationError)
export class ErrorFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {

    const response = host.switchToHttp().getResponse();

    if( exception instanceof ValidationError)
    {
      response.status(400).json({
        errors: "Validation Error",
      });
    }
    else if( exception instanceof HttpException)
    {
      response.status(exception.getStatus()).json({
        errorsss: exception.message,
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
