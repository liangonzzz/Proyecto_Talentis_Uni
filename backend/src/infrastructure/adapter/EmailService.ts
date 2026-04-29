import nodemailer from 'nodemailer';
import { envs } from '../config/environment-vars';

export class EmailService {
  private static async crearTransporter() {
    const testAccount = await nodemailer.createTestAccount();

    return nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  async enviarCorreoRestablecimiento(correo: string, token: string): Promise<void> {
    const transporter = await EmailService.crearTransporter();

    const resetLink = `${envs.FRONTEND_URL}/src/infrastructure/ui/auth/reset-password/reset-password.html?token=${token}`;

    const info = await transporter.sendMail({
      from: '"GRH Talentis" <no-reply@talentis.com>',
      to: correo,
      subject: 'Restablece tu contraseña',
      html: `
        <p>Hola,</p>
        <p>Recibimos una solicitud para restablecer tu contraseña.</p>
        <p>Haz clic en el siguiente enlace (válido por 60 minutos):</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>Si no solicitaste esto, ignora este correo.</p>
      `,
    });

    console.log('Correo enviado. Previsualización:', nodemailer.getTestMessageUrl(info));
  }
}