import { Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Controller('/wires/auth')
export class AuthController {
  @Post('/signup')
  signUp(){
  }
}
