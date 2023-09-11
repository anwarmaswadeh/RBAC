import './config.js';
import createError from 'http-errors';
import express from "express";
import logger from 'morgan';
import cors from 'cors';

import dataSource from "./db/dataSource.js";
import usersRouter from './routes/user.js';
import postRouter from './routes/post.js'
import { authenticate } from "./middleware/auth/authenticate.js";

var app = express();
const PORT = 3000;

app.use(cors({
    origin: "http://localhost:3000"
  }));

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  
  app.use('/users', usersRouter);
  app.use('/posts', authenticate, postRouter);
  
  app.use((req, res, next) => {
    next(createError(404));
  });
  
  app.use((err: any, req: any, res: any, next: any) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500).send(err);
  });

app.listen(PORT, () => {
    logger(`App is listening on port ${PORT}`);
    console.log(`App is listening on port ${PORT}`);
    dataSource.initialize();
  });
  
  export default app;