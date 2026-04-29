import { Request, Response, NextFunction } from 'express';
import { JwtUtil } from '../util/jwt.util';

export interface RequestConUsuario extends Request {
  usuario?: {
    id: number;
    rol: string;
  };
}

export function verificarToken(req: RequestConUsuario, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Sin token' });
    return;
  }

  try {
    const payload = JwtUtil.verify(token);
    req.usuario = payload;
    next();
  } catch {
    res.status(401).json({ message: 'Token inválido o expirado' });
  }
}