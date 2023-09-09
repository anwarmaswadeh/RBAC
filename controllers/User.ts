import express from 'express';
import { User } from '../db/entities/User.js';
import { Role } from '../db/entities/Role.js';

var router = express.Router();

router.post('/users', async (req: express.Request, res:express.Response) => {
    try {
      const newUser =  await User.create(req.body);
      await newUser.save();
      res.status(201).send( newUser );
    } catch (error) {
      res.status(500).send( 'An error occurred when created users ' );
    }
  });

  router.post('/users/:userId/roles/:roleId', async (req, res) => {
    try {
      const user = await User.findOne({where: {id: parseInt(req.params.userId)}});
      const role = await Role.findOne({where: {id: parseInt(req.params.roleId)}});
  
      if (!user || !role) {
        return res.status(404).send( 'User or role not found' );
      }
        await user.assignRole(role);
        res.status(200).send(user);
    } catch (error) {
      res.status(500).send('An error occurred when Assign Role to User' );
    }
  });

  router.get('/users/:userId', async (req, res) => {
    try {
      const userId = Number(req.params.userId);
        const user = await User.findByIdWithRolesAndPermissions(userId);
        res.status(200).send(user);
    } catch (error) {
      res.status(500).send( 'An error occurred when Get User' );
    }
  });
  
  export default router;