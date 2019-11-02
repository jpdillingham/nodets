import EventRecord from "./model/eventRecord";
import Event from "./dto/event";

class EventRepository {
  private events: { [email: string]: EventRecord[] } = {};

  public add(email: string, event: Event, created?: Date): void {
    let record = new EventRecord(event.type, created || new Date());

    this.events[email] = !this.events[email]
      ? [record]
      : this.events[email].concat(record);
  }

  public get(): EventRecord[];
  public get(email?: string): EventRecord[] {
    if (email) {
      return this.events[email].map(record => 
        new EventRecord(record.type, record.created, email));
    }

    return Object.entries(this.events).reduce((acc, [email, records]) =>
        acc.concat(records.map(record => 
          new EventRecord(record.type, record.created, email))), []);
  }

  public getLast24Hours(): any[] {
    let yesterday = new Date();
    yesterday.setTime(yesterday.getTime() - (60*60*24*1000));

    return this.get().filter(record => record.created > yesterday)
  }
}

export default EventRepository;
