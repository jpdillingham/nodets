import { IsString, Matches, IsOptional } from 'class-validator';

class User {
    constructor(email: string, password: string, phone?: string) {
        this.email = email;
        this.password = password;
        this.phone = phone;
    }

    @IsString()
    public readonly email: string;

    @IsString()
    public readonly password: string;

    @IsOptional()
    @Matches(/^\d{3}-\d{3}-\d{4}$/i)
    public readonly phone?: string;
}

export default User;