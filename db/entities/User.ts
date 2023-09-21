import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import bcrypt from 'bcrypt';
import { Role } from "./Role.js";
import { Profile } from "./Profile.js";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255, nullable: false })
  userName: string;

  @Column({ nullable: false })
  email: string;

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10)
    }
  }
  @Column({ nullable: false })
  password: string;
  
  @CreateDateColumn({
    type: 'timestamp',
    default: () => "CURRENT_TIMESTAMP(6)"
  })
  createdAt: Date;

  @ManyToMany(() => Role, role => role.users, { cascade: true, onDelete:"CASCADE", onUpdate:"CASCADE"})
  @JoinColumn()
  role: Role[];

  @OneToOne(()=>Profile)
  @JoinColumn()
  profile:Profile
}