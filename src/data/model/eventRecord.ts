class EventRecord {
    constructor(type: string, created: Date, email?: string) {
        this.type = type;
        this.created = created;
        this.email = email;
    }

    public readonly type: string;
    public readonly created: Date;
    public readonly email: string;
}

export default EventRecord;