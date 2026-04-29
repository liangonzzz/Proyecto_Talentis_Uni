import bcrypt from 'bcryptjs';

export const BcryptUtil = {
  hash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  },

  compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
};