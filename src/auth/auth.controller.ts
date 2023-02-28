import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private auth: AuthService,
    ) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.auth.login(req.user);
    }

    @Post('register')
    async register(@Body() body: CreateUserDto) {
        return this.auth.register(body);
    }

    @Get('users')
    users() {
        return this.auth.allUsers();
    }
}
