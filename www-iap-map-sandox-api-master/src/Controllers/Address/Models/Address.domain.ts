import { IAddressEntity } from "iap-domain";

export class DomainAddress implements IAddressEntity {
    id: number;
    Address: string;
    PostalCode: number;
}