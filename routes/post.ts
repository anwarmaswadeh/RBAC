import express from 'express';

import { authorize } from '../middleware/auth/authorize.js';
var router = express.Router();

router.post('/', authorize('POST_post'), (req, res, next) => {
  res.status(201).send('post has been created successfully');
});

router.get('/', authorize('GET_posts'), (req, res, next) => {
  res.status(201).send('all posts data');
});

export default router;