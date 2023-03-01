import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateSessionDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    descritption?: string;

    @IsNumber()
    @IsNotEmpty()
    user: number;
}
