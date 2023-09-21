import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, BaseEntity, CreateDateColumn } from 'typeorm';
import { Role } from './Role.js';

@Entity()
export class Permission extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true })
  name: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => "CURRENT_TIMESTAMP(6)"
  })
  createdAt: Date;

  @ManyToMany(() => Role, role => role.permissions)
  roles: Role[];
}