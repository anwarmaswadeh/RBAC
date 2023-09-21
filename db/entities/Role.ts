import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, BaseEntity, CreateDateColumn} from 'typeorm';
import { User } from './User.js';
import { Permission } from './Permission.js';

@Entity('roles')
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true, nullable: false})
  name: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => "CURRENT_TIMESTAMP(6)"
})
createdAt: Date;

  @ManyToMany(() => Permission, { cascade: true, eager: true })
  @JoinTable()
  permissions: Permission[];

  @ManyToMany(() => User, user => user.role)
  users: User[]; 
}
