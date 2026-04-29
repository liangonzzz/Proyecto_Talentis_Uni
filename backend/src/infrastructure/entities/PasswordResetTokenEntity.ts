import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('password_reset_tokens')
export class PasswordResetTokenEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  usuario_id!: number;

  @Column()
  token!: string;

  @Column()
  expires_at!: Date;

  @Column({ default: false })
  used!: boolean;

  @CreateDateColumn()
  created_at!: Date;
}