import nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';
import { envs } from '../config/environment-vars';

export class EmailService {
  private static transporter: Transporter | null = null;

  // Crea el transporter una sola vez y lo reutiliza
  private static async getTransporter(): Promise<Transporter> {
    if (!EmailService.transporter) {
      const testAccount = await nodemailer.createTestAccount();
      EmailService.transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
        tls: { rejectUnauthorized: false },
      });
      console.log('📧 Ethereal listo:', testAccount.user);
    }
    return EmailService.transporter;
  }

  // ── Restablecer contraseña ────────────────────────────────────────
  async enviarCorreoRestablecimiento(correo: string, token: string): Promise<void> {
    const transporter = await EmailService.getTransporter();
    const link = `${envs.FRONTEND_URL}/src/infrastructure/ui/auth/reset-password/reset-password.html?token=${token}`;

    const info = await transporter.sendMail({
      from: '"GRH Talentis" <no-reply@talentis.com>',
      to: correo,
      subject: 'Restablece tu contraseña',
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:auto;">
          <h2 style="color:#1a3a5c;">Restablecer contraseña</h2>
          <p>Recibimos una solicitud para restablecer tu contraseña.</p>
          <p>Haz clic en el enlace (válido por 60 minutos):</p>
          <a href="${link}" style="display:inline-block;margin:20px 0;padding:12px 24px;background:#1a3a5c;color:#fff;border-radius:8px;text-decoration:none;font-weight:bold;">
            Restablecer contraseña
          </a>
          <p style="color:#6b7f96;font-size:13px;">Si no solicitaste esto, ignora este correo.</p>
        </div>
      `,
    });

    console.log('✅ Correo restablecimiento → ver en:', nodemailer.getTestMessageUrl(info));
  }

  // ── Bienvenida candidato ──────────────────────────────────────────
  async enviarCorreoBienvenidaCandidato(correo: string, nombre: string, token: string): Promise<void> {
    const transporter = await EmailService.getTransporter();
    const link = `${envs.FRONTEND_URL}/src/infrastructure/ui/auth/reset-password/reset-password.html?token=${token}`;

    const info = await transporter.sendMail({
      from: '"GRH Talentis" <no-reply@talentis.com>',
      to: correo,
      subject: 'Bienvenido a Talentis — Crea tu contraseña',
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:auto;">
          <h2 style="color:#1a3a5c;">¡Hola, ${nombre}!</h2>
          <p>Has sido registrado como candidato en <strong>Talentis</strong>.</p>
          <p>Para acceder al sistema crea tu contraseña. El enlace es válido por <strong>1 hora</strong>.</p>
          <a href="${link}" style="display:inline-block;margin:20px 0;padding:12px 24px;background:#1a3a5c;color:#fff;border-radius:8px;text-decoration:none;font-weight:bold;">
            Crear mi contraseña
          </a>
          <p style="color:#6b7f96;font-size:13px;">Si no esperabas este correo, puedes ignorarlo.</p>
          <hr style="border:none;border-top:1px solid #dde6f0;margin:20px 0;"/>
          <p style="color:#6b7f96;font-size:12px;">Talentis — Sistema de Gestión de Recursos Humanos</p>
        </div>
      `,
    });

    console.log('✅ Correo bienvenida → ver en:', nodemailer.getTestMessageUrl(info));
  }
}