import express from 'express';
import { Permission } from '../db/entities/Permission.js';

var router = express.Router();
router.post('/permissions', async (req, res) => {
    try {
      const newPermission = await Permission.create(req.body);
      await newPermission.save();
        res.status(201).send( newPermission );
    } catch (error) {
      res.status(500).send('An error occurred when created permission' );
    }
  });

  export default router;