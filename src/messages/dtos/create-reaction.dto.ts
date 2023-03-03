import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateReactionDto {
  @IsString()
  @IsNotEmpty()
  reaction: string;

  @IsString()
  @IsNotEmpty()
  author: string
}
