import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UsuarioEntity } from './UsuarioEntity';

@Entity('tareas')
export class TareaEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  usuario_id!: number;

  @ManyToOne(() => UsuarioEntity)
  @JoinColumn({ name: 'usuario_id' })
  usuario!: UsuarioEntity;

  @Column()
  nombre!: string;

  @Column({ type: 'text' })
  descripcion!: string;

  @Column()
  actividad!: string;

  @Column({ type: 'date' })
  fecha_inicio!: Date;

  @Column({ type: 'date' })
  fecha_fin!: Date;

  @Column({ type: 'int', default: 0 })
  horas_planeadas!: number;

  @Column({ type: 'int', default: 0 })
  horas_ejecutadas!: number;

  @Column({ default: false })
  finalizada!: boolean;

  @CreateDateColumn()
  created_at!: Date;
}