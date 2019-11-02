import { IsString, MinLength } from 'class-validator';

class Event {
    constructor(type: string) {
        this.type = type;
    }

    @IsString()
    @MinLength(1)
    public readonly type: string;
}

export default Event;