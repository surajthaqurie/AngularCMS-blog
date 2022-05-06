import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectRepository(User) private readonly repo: Repository<User>) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
        //   console.log(request?.cookies?.Authentication);
          return request?.cookies?.Authentication;
        },
      ]),
      secretOrKey: 'secretKey',
    });
  }

  async validate(payload: any, req: Request) {
    if (!payload) {
      throw new UnauthorizedException();
    }
    const user = await this.repo.findOne({ email: payload.email });
    if (!user) {
      throw new UnauthorizedException();
    }

    req.user = user;
    return req.user;
  }
}
