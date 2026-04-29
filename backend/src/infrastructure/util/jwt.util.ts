import jwt from 'jsonwebtoken';
import { envs } from '../config/environment-vars';
export const JwtUtil = {
  sign(payload: object): string {
    return jwt.sign(payload, envs.JWT_SECRET, { expiresIn: '8h' });
  },

  verify(token: string): any {
    return jwt.verify(token, envs.JWT_SECRET);
  }
};