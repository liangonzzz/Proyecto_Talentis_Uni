import { ICandidatoRepository } from '../../domain/ports/ICandidatoRepository';

export class ListarCandidatosUseCase {
  constructor(private candidatoRepo: ICandidatoRepository) {}

  async ejecutar() {
    return await this.candidatoRepo.listarCandidatos();
  }
}