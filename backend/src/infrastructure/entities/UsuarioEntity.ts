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

  @CreateDateColumn()
  created_at!: Date;
}