import { IsString, IsNotEmpty } from 'class-validator';


export class SignUpDto{

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  fullname: string
}
