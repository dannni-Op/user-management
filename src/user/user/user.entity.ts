import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity("users")
@Unique(["username"])
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255, nullable: false})
  username: string;

  @Column({ type: "varchar", length: 255, nullable: false})
  password: string;

  @Column({ type: "varchar",length: 255, nullable: false})
  name: string;

  @Column({ type: "varchar", length: 255, nullable: false})
  email: string;

  @Column({ type: "varchar", length: 255, nullable: true})
  token?: string;
}
