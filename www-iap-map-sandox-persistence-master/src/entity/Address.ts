import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";
import { IAddressEntity } from "iap-domain";

@Entity()
export class Address implements IAddressEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    Address: string;

    @Column()
    PostalCode: number;

}