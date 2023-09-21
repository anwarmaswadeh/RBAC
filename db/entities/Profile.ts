import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import { User } from "./User.js";

@Entity()
export class Profile extends BaseEntity{
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({nullable:false, length:255})
  firstName: string;

  @Column({nullable:false, length:255})
  lastName: string;

  @Column({ type: 'timestamp' })
  dateOfBirth: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => "CURRENT_TIMESTAMP()"
  })
  createdAt: Date;

}