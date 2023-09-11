import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, BaseEntity, JoinTable } from 'typeorm';
import { Role } from './Role.js';

@Entity()
export class Permission extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Role, role => role.permissions)
  @JoinTable()
  roles: Role[];
}