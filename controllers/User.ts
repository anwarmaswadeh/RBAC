import { User } from '../db/entities/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dataSource from '../db/dataSource.js';
import { NSUser } from '../@types/user.js';

const insertUser = (payload: NSUser.Item) => {
    return dataSource.manager.transaction(async transaction => {
      const newUser = User.create({userName: payload.type});
      await transaction.save(newUser);
  });
}

const login = async (email: string, password: string) => {
try {
    const user = await User.findOneBy({
    email
    });

    const passwordMatching = await bcrypt.compare(password, user?.password || '');

    if (user && passwordMatching) {
    const token = jwt.sign(
        {
        email: user.email,
        userName: user.userName
        },
        process.env.SECRET_KEY || '',
        {
        expiresIn: "30m"
        }
    );

    return token;
    } else {
    throw ("Invalid Username or password!");
    }
} catch (error) {
    throw ("Invalid Username or password!");
}
}

export { insertUser, login }