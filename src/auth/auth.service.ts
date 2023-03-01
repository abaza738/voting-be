import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @InjectRepository(Users) private userRepo: Repository<Users>,
    ) {}

    async me(req: any) {
        const authorization = req.headers.authorization;
        if (!authorization) {
            throw new HttpException('Nope', HttpStatus.BAD_REQUEST);
        }
        const token = authorization.split(' ')[1];
        const verified = this.jwtService.verify(token);
        if (!verified) {
            throw new HttpException('Nope', HttpStatus.BAD_REQUEST);
        }
        const id = +verified['sub'];
        if (!id || isNaN(id)) {
            throw new HttpException('Nope', HttpStatus.BAD_REQUEST);
        }
        return this.findById(id);
    }

    allUsers() {
        return this.userRepo.find({ select: ['id', 'username', 'firstName', 'lastName'] });
    }

    async findByUsername(username: string): Promise<Users> {
        try {
            return await this.userRepo.findOneByOrFail({ username });
        } catch (e) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
    }

    async findById(id: number) {
        try {
            return await this.userRepo.findOneByOrFail({ id });
        } catch (e) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
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

    async login(user: Users) {
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
