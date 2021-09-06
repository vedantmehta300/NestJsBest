import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService, JwtSecretRequestType } from '@nestjs/jwt';
import { LoginUserDto } from 'src/users/loginUser.dto';
import { RegisterUserDto } from 'src/users/register.dto';
import { ResponseUserDto } from 'src/users/response.user.dto';
import { UsersService } from 'src/users/users.service';

export interface AuthStatus {
  success: boolean;
  message: string;
}
export interface JwtPayload {
  phone: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(userDto: RegisterUserDto): Promise<AuthStatus> {
    let status: AuthStatus = {
      success: true,
      message: 'user registered',
    };

    const { phone, email } = userDto;

    const valid = phone || email;

    try {
      if (!valid) {
        throw new HttpException(
          ` phone number or email must be provided`,
          HttpStatus.BAD_REQUEST,
        );
      }

      await this.usersService.create(userDto);
    } catch (err) {
      status = {
        success: false,
        message: err,
      };
    }
    return status;
  }

  async login(loginUserDto: LoginUserDto): Promise<AuthStatus> {
    // find user in db
    const user = await this.usersService.findByLogin(loginUserDto);

    // generate and sign token
    const token = this._createToken(user);

    return {
      phone: user.phone,
      ...token,
    };
  }

  private _createToken({ phone }: ResponseUserDto): any {
    const user: JwtPayload = { phone };
    const accessToken = this.jwtService.sign(user);
    return {
      expiresIn: process.env.EXPIRESIN,
      accessToken,
    };
  }

  async validateUser(payload: JwtPayload): Promise<ResponseUserDto> {
    const user = await this.usersService.findByPayload(payload);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
