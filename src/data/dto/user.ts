import { IsString, Matches } from 'class-validator';

class User {
    constructor(email: string, password: string, phoneNumber?: string) {
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
    }

    @IsString()
    public readonly email: string;

    @IsString()
    public readonly password: string;

    @Matches(new RegExp('^\d{3}-\d{3}-\d{4}$'))
    public readonly phoneNumber?: string;
}

export default User;