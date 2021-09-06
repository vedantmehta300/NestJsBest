import { IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @IsPhoneNumber()
  readonly phone: string;
  @IsNotEmpty() readonly password: string;
}
