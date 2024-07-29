import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(
       // private readonly omscustomerService: OmscustomerService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(username: string, password: string) {
        // find if user exist with this email

        // if (username === api_username && await this.comparePassword(password, api_password)) {

        //     return {username,login_time : Date.now()} 

        // } else {

        //    return false
        // }

        return {username,login_time : Date.now()} 
    }

    public async login(user) {

        const token = await this.generateToken(user);

        return { user, token };
    }


    private async generateToken(user) {
        const token = await this.jwtService.signAsync(user);
        return token;
    }

    private async hashPassword(password) {
        const hash = await bcrypt.hash(password, 10);
        return hash;
    }

    private async comparePassword(enteredPassword, dbPassword) {
        const match = await bcrypt.compare(enteredPassword, dbPassword);
        return match;
    }
}