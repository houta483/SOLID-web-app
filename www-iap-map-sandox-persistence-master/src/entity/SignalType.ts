import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, OneToMany, ManyToOne } from "typeorm";
import { ISignalTypeEntity } from "iap-domain"

@Entity()
export class SignalType implements ISignalTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  SignalTypeID: number;

  @Column({ nullable: true })
  SignalTypeName: string;
}