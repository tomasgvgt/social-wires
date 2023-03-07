import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY,
    });
  }

  async validate(payload: any) {
    const user = await this.authService.getUser(payload.id);
    if (!user) throw new UnauthorizedException();
    return user.id;
  }
}


// const {Strategy, ExtractJwt} = require('passport-jwt');
// const user = require('../controllers/user.controller');

// const options = {
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey: process.env.SECRET_KEY
// }

// const jwtStrategy = new Strategy(options, async (payload, done)=>{
//   try{
//     const error = new Error('Unauthorized');
//     error.name = "UnauthorizedError";
//     const theUser = await user.getUser(payload.id);
//     if(!theUser) done(error, false);
//     done(null, payload)
//   }catch(err){
//     const error = new Error('Unauthorized');
//     error.name = "UnauthorizedError";
//     done(error, false);
//   }
// })

// module.exports = jwtStrategy;