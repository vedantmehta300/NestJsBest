import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import 'dotenv/config';


export const secret =  process.env.SECRETKEY;
const toketExpires =  process.env.EXPIRESIN

@Module({
    imports: [  
        UsersModule,    
        PassportModule.register({      
            defaultStrategy: 'jwt',      
            property: 'user',      
            session: false,    
        }),    
        JwtModule.register({
            secret: secret, signOptions: {
                expiresIn: toketExpires,
            },
        }), 
    ],  
    controllers: [AuthController],  
    providers: [AuthService, JwtStrategy],  
    exports: [
        PassportModule, 
        JwtModule
    ],
})
export class AuthModule {

    
}

