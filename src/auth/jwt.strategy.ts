import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { RegisterUserDto } from 'src/users/register.dto';
import { AuthService, JwtPayload } from './auth.service';
import 'dotenv/config';
import { ResponseUserDto } from 'src/users/response.user.dto';

//todo 
// const secret = secret; // process.env.SECRETKEY,
export const secret =  process.env.SECRETKEY;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) { 
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: secret,
        });  
    }
    
    async validate(payload: JwtPayload): Promise<ResponseUserDto> {
        const user = await this.authService.validateUser(payload);
        if (!user) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);    
        }    
        return user;  
    }
}
