import { Injectable, NestMiddleware } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {

  constructor(private prismaService: PrismaService) {}

  async use(req: any, res: any, next: () => void) {
    //hasil dari headers object
    const token: string = req.headers["authorization"] as string;

    if( token )
    {
      const user: User = await this.prismaService.user.findFirst({
        where: {
          token: token,
        }
      });

      if( user )
      {
        req.user = user;
      }
    }

    next();
  }
}
