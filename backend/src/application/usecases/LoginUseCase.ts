import { IUsuarioRepository } from '../../domain/ports/IUsuarioRepository.ts';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class LoginUseCase {
  constructor(private usuarioRepository: IUsuarioRepository) {}

  async execute(tipo_documento: string, numero_documento: string, password: string) {
    const usuario = await this.usuarioRepository.findByDocumento(tipo_documento, numero_documento);

    if (!usuario) {
      throw new Error('Credenciales incorrectas');
    }

    const passwordValida = await bcrypt.compare(password, usuario.password);

    if (!passwordValida) {
      throw new Error('Credenciales incorrectas');
    }

    const token = jwt.sign(
      { id: usuario.id, rol: usuario.rol },
      process.env.JWT_SECRET as string,
      { expiresIn: '8h' }
    );

    return { token, rol: usuario.rol, nombre: usuario.nombre };
  }
}