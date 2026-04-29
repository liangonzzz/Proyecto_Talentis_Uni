import { AppDataSource } from '../config/data-base';
import { envs } from '../config/environment-vars';
import app from '../web/app';

export class ServerBootstrap {
  static async start() {
    await AppDataSource.initialize();
    console.log('✅ Base de datos conectada');

    app.listen(envs.PORT, () => {
      console.log(`🚀 Servidor corriendo en puerto ${envs.PORT}`);
    });
  }
}