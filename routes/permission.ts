import express from 'express';
import { authenticate } from '../middleware/auth/authenticate.js';
import insertPermission from '../controllers/permission.js';

const router = express.Router();

router.post('/permission', authenticate, (req, res, next) => {
    insertPermission(req.body).then((data) => {
      res.status(201).send(data)
    }).catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
  });

  export default router;