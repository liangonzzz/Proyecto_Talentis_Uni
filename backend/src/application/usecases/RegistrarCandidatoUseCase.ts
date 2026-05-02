import { ICandidatoRepository } from '../../domain/ports/ICandidatoRepository';
import { IPasswordResetRepository } from '../../domain/ports/IPasswordResetRepository';
import { EmailService } from '../../infrastructure/adapter/EmailService';
import { BcryptUtil } from '../../infrastructure/util/bcrypt.util';
import crypto from 'crypto';

interface RegistrarCandidatoDTO {
  nombre: string;
  apellidos: string;
  tipo_documento: string;
  numero_documento: string;
  correo: string;
}

export class RegistrarCandidatoUseCase {
  constructor(
    private candidatoRepo: ICandidatoRepository,
    private passwordResetRepo: IPasswordResetRepository,
    private emailService: EmailService
  ) {}

  async ejecutar(dto: RegistrarCandidatoDTO) {
    // 1. Validar duplicados
    const correoExiste = await this.candidatoRepo.buscarPorCorreo(dto.correo);
    if (correoExiste) throw new Error('Ya existe un usuario con ese correo');

    const docExiste = await this.candidatoRepo.buscarPorDocumento(dto.tipo_documento, dto.numero_documento);
    if (docExiste) throw new Error('Ya existe un usuario con ese documento');

    // 2. Crear con password temporal (el candidato la establece por correo)
    const passwordTemp = await BcryptUtil.hash(crypto.randomBytes(16).toString('hex'));

    const candidato = await this.candidatoRepo.crear({
      nombre: dto.nombre,
      apellidos: dto.apellidos,
      tipo_documento: dto.tipo_documento,
      numero_documento: dto.numero_documento,
      correo: dto.correo,
      password: passwordTemp,
      rol: 'candidato',
    });

    // 3. Generar token de restablecimiento (mismo flujo que ya tienes)
    const token = crypto.randomBytes(32).toString('hex');
    const expiracion = new Date(Date.now() + 60 * 60 * 1000); // 1 hora
    await this.passwordResetRepo.save(candidato.id!, token, expiracion);
    
    // 4. Enviar correo de bienvenida con link para crear contraseña
    await this.emailService.enviarCorreoBienvenidaCandidato(dto.correo, dto.nombre, token);

    return candidato;
  }
}