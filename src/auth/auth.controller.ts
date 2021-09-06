import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { LoginUserDto } from 'src/users/loginUser.dto';
import { RegisterUserDto } from 'src/users/register.dto';
import { AuthService, AuthStatus } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async register(
    @Body() createUserDto: RegisterUserDto,
  ): Promise<AuthStatus> {

    
    const result: AuthStatus = await this.authService.register(createUserDto);
    console.debug('--- resutl ', result);
    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto): Promise<AuthStatus> {
    return await this.authService.login(loginUserDto);
  }
}
