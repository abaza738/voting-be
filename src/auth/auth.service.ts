import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @InjectRepository(User) private userRepo: Repository<User>,
    ) {}

    async me(req: any) {
        const decoded = req.headers;
        console.log(req.headers);
        throw new HttpException('Nope', HttpStatus.BAD_REQUEST);
    }

    allUsers() {
        return this.userRepo.find({ select: ['id', 'username', 'firstName', 'lastName'] });
    }

    async findByUsername(username: string): Promise<User> {
        return this.userRepo.findOneByOrFail({ username });
    }

    async findById(id: number) {
        return this.userRepo.findOneByOrFail({ id });
    }

    async authenticate(username: string, userPassword: string) {
        let user;

        try {
            user = await this.findByUsername(username);
        } catch (e) {
            throw new HttpException("Wrong username or password", HttpStatus.BAD_REQUEST);
        }

        const { password, createdAt, updatedAt, ...rest } = user;
        const passwordsMatch = await bcrypt.compare(userPassword, password);

        if (passwordsMatch) {
            return rest;
        }

        throw new HttpException("Wrong username or password", HttpStatus.BAD_REQUEST);
    }

    async login(user: User) {
        const payload = {
            sub: user.id
        };
        return {
            access: this.jwtService.sign(payload),
        }
    }

    async register(dto: CreateUserDto) {
        const hashedPassword = await this._encrypt(dto.password);
        const user = this.userRepo.create({ ...dto, password: hashedPassword });
        try {
            const { password, createdAt, updatedAt, ...rest } = await this.userRepo.save(user);
            return { success: true, data: rest };
        } catch (e) {
            throw new HttpException('Username already exists', HttpStatus.BAD_REQUEST);
        }
    }

    private async _encrypt(input: string) {
        const salt = await bcrypt.genSalt();
        return bcrypt.hash(input, salt);
    }
}
