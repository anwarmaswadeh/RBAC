import express from "express";
import { validateUser } from "../middleware/validation/user.js";
import { getUsers, insertUser, login } from "../controllers/user.js";
import { authenticate } from "../middleware/auth/authenticate.js";

var router = express.Router();

router.post('/', validateUser, (req, res, next) => {
    insertUser(req.body).then(() => {
      res.status(201).send(`Successfully Added the user`)
    }).catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
  });

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    if(email && password) {
    login(email, password)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(401).send(err);
        })
      }else {
        res.status(400).send(`Invalid email or password.`);
    }
});

router.get('/user', authenticate, async (req, res, next) => {
  try {
    const users = await getUsers();
    res.send(users);
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
});

  
  export default router;

