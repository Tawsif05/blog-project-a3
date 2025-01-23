import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
export const createToken = (
  jwtPayload: {
    email: string;
    role: 'user' | 'admin' | undefined;
    _id: Types.ObjectId;
  },
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};
