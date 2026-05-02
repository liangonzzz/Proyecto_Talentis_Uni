import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('mensajes')
export class MensajeEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  candidato_id!: number;

  @Column()
  autor_id!: number;

  @Column({ type: 'varchar', length: 20 })
  autor_rol!: 'admin' | 'candidato';

  @Column({ type: 'text' })
  mensaje!: string;

  @Column({ default: false })
  leido!: boolean;

  @CreateDateColumn()
  created_at!: Date;
}