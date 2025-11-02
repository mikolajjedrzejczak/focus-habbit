import bcrypt from 'bcryptjs';
import db from '../db.js';
import type { RegisterBody } from '../validators/auth.validator.js';

export const findUserByEmail = (email: string) => {
  return db.user.findUnique({
    where: { email },
  });
};

export const createUser = async (data: RegisterBody) => {
  const { email, password } = data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await db.user.create({
    data: {
      email: email,
      password: hashedPassword,
    },
  });

  return user;
};
