import { Injectable, NestMiddleware, Inject } from '@nestjs/common';
import { User } from 'src/user/user/user.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class AuthMiddleware implements NestMiddleware {

  constructor(@Inject("DATA_SOURCE") private dataSource: DataSource) {}

  async use(req: any, res: any, next: () => void) {
    //hasil dari headers object
    const token: string = req.headers["authorization"] as string;

    if( token )
    {
      // ambil data user
      const userRepository = this.dataSource.getRepository(User);
      const user = await userRepository.findOne({
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
