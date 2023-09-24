import './config.js';
import express from "express";
import cors from 'cors';

import dataSource from "./db/dataSource.js";
import usersRouter from './routes/user.js';
import permissionrouter from './routes/permission.js';
import rolerouter from './routes/role.js'
import { authenticate } from './middleware/auth/authenticate.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: "http://localhost:3000"
}));

app.use(express.json());
app.use('/users', authenticate, usersRouter);
app.use('/roles' ,authenticate, rolerouter );
app.use('/permissions' , authenticate, permissionrouter );

app.use((err: any, req: any, res: any, next: any) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500).send(err);
});

app.get("/", (req, res) => {
  res.send("Server UP !");
});

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});

export default app;