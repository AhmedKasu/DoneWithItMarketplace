import Router from 'express';
import bcrypt from 'bcrypt';
import _ from 'lodash';

import { User } from '../models/User';

import validateUserInput from '../utils/validation';
import { userSchema } from '../utils/validation/schemas';

const router = Router();

router.post('/', async (req, res) => {
  const { name, email, password } = validateUserInput(userSchema, req.body);

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name,
    email,
    passwordHash,
  });

  res
    .status(200)
    .json(_.omit(newUser.toJSON(), ['passwordHash', 'createdAt', 'updatedAt']));
});

export default router;
