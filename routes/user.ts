import express from "express";
import { validateUser } from "../middleware/validation/user.js";
import { insertUser, login } from "../controllers/user.js";
import { authorize } from "../middleware/auth/authorize.js";
import { authenticate } from "../middleware/auth/authenticate.js";
import { Role } from "../db/entities/Role.js";
import insertRole from "../controllers/role.js";
import insertPermission from "../controllers/permission.js";


var router = express.Router();

router.post('/', authorize('POST_users'), validateUser, (req, res, next) => {
    insertUser(req.body).then(() => {
      res.status(201).send()
    }).catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
  });

  router.post('/role', authorize('POST_users/role'), authenticate, (req, res, next) => {
    insertRole(req.body).then((data) => {
      res.status(201).send(data)
    }).catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
  });
  
  router.post('/permission', authenticate, (req, res, next) => {
    insertPermission(req.body).then((data) => {
      res.status(201).send(data)
    }).catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
  });


router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    login(email, password)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(401).send(err);
        })
});

router.get('/roles', authorize('GET_users/role'), authenticate, async (req, res, next) => {
    try {
      const roles = await getRoles();
      res.send(roles);
    } catch (error) {
      res.status(500).send("Something went wrong");
    }
  });

router.get('/', (req, res, next) => {
    res.send('respond with a resource');
});

const getRoles = () => {
    return Role.find();
  }
  
  export default router;

