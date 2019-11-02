import express from "express";
import Event from './data/dto/event';
import User from './data/dto/user';
import EventRepository from './data/eventRepository';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError, ValidatorOptions } from 'class-validator';
import validator from 'validator';

const port = 3000;

const validatorOptions : ValidatorOptions = {
  forbidUnknownValues: true,
  forbidNonWhitelisted: true,
  whitelist: true,
};

const app = express();
app.use(express.json());

const repo = new EventRepository();

app.post('/users', (req: express.Request, res: express.Response) => {
  let user: User = plainToClass(User, req.body);

  validate(user, validatorOptions).then((errors: ValidationError[]) => {
    if (errors.length > 0) {
      return res.status(400).json({ message: 'POST body failed validation', errors });
    }

    // NOOP
    return res.status(201).end();
  })
});

app.get('/events', (req: express.Request, res: express.Response) => {
  if (req.query.last24Hours) {
    return res.send(repo.getLast24Hours());
  }

  return res.send(repo.get());
});

app.get('/events/:email', (req: express.Request, res: express.Response) => {
  let { email } = req.params;

  if (!validator.isEmail(email)) {
    return res.status(400).end(`invalid email: '${email}'`);
  }
  
  return res.send(repo.get(email));
})

app.post('/events/:email', (req: express.Request, res: express.Response) => {
  let { email } = req.params;

  if (!validator.isEmail(email)) {
    return res.status(400).end(`invalid email: '${email}'`);
  }

  let event: Event = plainToClass(Event, req.body);

  validate(event, validatorOptions).then((errors: ValidationError[]) => {
    if (errors.length > 0) {
      return res.status(400).json({ message: 'POST body failed validation', errors });
    }

    repo.add(req.params.email, event);
    return res.status(201).end();
  });
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});