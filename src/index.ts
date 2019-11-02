import express from "express";
import EventRecord from "./data/model/eventRecord";
import User from "./data/dto/user";
import Event from './data/dto/event';
import EventRepository from './data/eventRepository';

const app = express();
const port = 3000;

// app.get("/", (req: express.Request, res: express.Response) => {
//   res.send("hello world!");
// });

// app.listen(port, () => {
//   console.log(`Listening at http://localhost:${port}`);
// });

let repo = new EventRepository();

let e1 = new Event("type1");
let e2 = new Event("type2");

repo.add("foo@bar", e1);
repo.add("foo@bar", e2);
repo.add("baz@qux", e1);

let twodaysago = new Date();
twodaysago.setDate(twodaysago.getDate() - 1);
repo.add("baz@qux", e2, twodaysago)

// console.log(repo.get());

// console.log(repo.get("foo@bar"))

console.log(repo.getLast24Hours());