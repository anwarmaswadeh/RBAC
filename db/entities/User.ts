import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToMany, BaseEntity, JoinColumn, JoinTable } from "typeorm";
import { Role } from './Role.js';


@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 50, nullable: false })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  email: string;

  @ManyToMany(() => Role, { cascade: true, eager: true })
  @JoinTable()
  roles: Role[];

  async assignRole(role: Role) {
    this.roles = [...this.roles, role];
    await this.save();
  }

  static async findByIdWithRolesAndPermissions(userId: number): Promise<User | null> {
    return this.createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'roles')
      .leftJoinAndSelect('roles.permissions', 'permissions')
      .where('user.id = :userId', { userId })
      .getOne();
  }
}