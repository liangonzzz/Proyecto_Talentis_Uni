import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('usuarios')
export class UsuarioEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column()
  apellidos!: string;

  @Column()
  tipo_documento!: string;

  @Column()
  numero_documento!: string;

  @Column()
  correo!: string;

  @Column()
  password!: string;

  @Column()
  rol!: 'admin' | 'jefe' | 'empleado' | 'candidato';

  @Column({ default: false })
  bloqueado!: boolean;

  @Column({ type: 'text', nullable: true })
  motivo_bloqueo!: string | null;

  @Column({ type: 'timestamp', nullable: true })
  bloqueado_at!: Date | null;

  @Column({ type: 'varchar', length: 50, default: 'Activo' })
  estado!: string;

  @CreateDateColumn()
  created_at!: Date;
}