import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, OneToMany, ManyToOne } from "typeorm";
import { Address } from "./Address";
import { ISignalEntity, ISignalTypeEntity } from "iap-domain";
import { IAddressEntity } from "iap-domain";
import { SignalType } from './SignalType'

@Entity()
export class Signal implements ISignalEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true, type: "decimal" })
    Latitude: number;

    @Column({ nullable: true, type: "decimal" })
    Longitude: number;

    @Column()
    Name: string;

    @ManyToOne(type => SignalType, signalType => signalType.id)
    SignalType: ISignalTypeEntity;

    @OneToOne(type => Address, Address => Address.id)
    @JoinColumn()
    Address: IAddressEntity;
}
