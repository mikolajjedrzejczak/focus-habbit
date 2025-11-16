import crypto from 'crypto';
import jwt from 'jsonwebtoken';

export const hashToken = (token: string) => {
  return crypto.createHash('sha256').update(token).digest('hex');
};

export const generateAccessToken = (userId: string) => {
  return jwt.sign({ userId: userId }, process.env.JWT_SECRET as string, {
    expiresIn: '15m',
  });
};
