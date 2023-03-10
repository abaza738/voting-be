import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private auth: AuthService,) {
        super(); // pass required configuration for strategy
    }

    async validate(username: string, password: string) {
        let user;
        try {
            user = this.auth.authenticate(username, password);
        } catch(e) {
            throw new UnauthorizedException()
        }
        return user;
    }
}