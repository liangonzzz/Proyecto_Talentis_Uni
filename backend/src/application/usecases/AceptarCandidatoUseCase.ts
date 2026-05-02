import { ICandidatoRepository } from '../../domain/ports/ICandidatoRepository';

export class AceptarCandidatoUseCase {
  constructor(private candidatoRepo: ICandidatoRepository) {}

  async ejecutar(id: number): Promise<void> {
    await this.candidatoRepo.clasificarComoFuncionario(id);
  }
}