import { IsString, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(11)
  @MaxLength(11)
  account: string;

  @IsString()
  @MinLength(6)
  password: string;
}
