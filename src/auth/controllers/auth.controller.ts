import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SignUpDto } from '../dtos/sign-up.dto';
import { SignInDto } from '../dtos/sign-in.dto';

@Controller('/wires/auth')
export class AuthController {
  constructor(private readonly authService: AuthService){}

  @Post('/signup')
  signUp(@Body() payload: SignUpDto){
    return payload;
  }
  
  @Post('/signin')
  signin(@Body() payload: SignInDto){
    return payload;
  }
}
