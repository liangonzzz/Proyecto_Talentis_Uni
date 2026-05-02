import { IUsuarioRepository } from '../../domain/ports/IUsuarioRepository';
import { JwtUtil } from '../../infrastructure/util/jwt.util';
import { BcryptUtil } from '../../infrastructure/util/bcrypt.util';

export class LoginUseCase {
  constructor(private usuarioRepository: IUsuarioRepository) {}

  async execute(tipo_documento: string, numero_documento: string, password: string) {
    const usuario = await this.usuarioRepository.findByDocumento(tipo_documento, numero_documento);

    if (!usuario) throw new Error('Credenciales incorrectas');

    const passwordValida = await BcryptUtil.compare(password, usuario.password);

    if (!passwordValida) throw new Error('Credenciales incorrectas');

    const token = JwtUtil.sign({ id: usuario.id, rol: usuario.rol, nombre: `${usuario.nombre} ${usuario.apellidos}` });

    return { 
      token, 
      rol: usuario.rol, 
      nombre: `${usuario.nombre} ${usuario.apellidos}`, 
      correo: usuario.correo, 
      tipo_documento: usuario.tipo_documento, 
      numero_documento: usuario.numero_documento,
      id: usuario.id
    };
  }
} 