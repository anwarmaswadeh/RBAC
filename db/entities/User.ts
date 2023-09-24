import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./Role.js";
import { Profile } from "./Profile.js";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: false })
  userName: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  email: string;

  @OneToOne(()=> Profile, { cascade: true, eager: true })
  @JoinColumn()
  profile: Profile;

  @ManyToMany(() => Role, { cascade: true, onDelete:"CASCADE", onUpdate:"CASCADE"})
  @JoinTable()
  role: Role[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => "CURRENT_TIMESTAMP(0)"
  })
  createdAt: Date;
}