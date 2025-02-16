import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import "reflect-metadata";

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 80 })   
  name!: string;

  @Column({ type: "text", nullable: true })
  startDate?: string;

  @Column({ type: "text", nullable: true })
  endDate?: string;
  
}
