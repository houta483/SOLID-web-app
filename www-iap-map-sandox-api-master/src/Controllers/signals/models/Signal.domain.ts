import { ISignalEntity, IAddressEntity, ISignalTypeEntity } from "iap-domain";

export class DomainSignal implements ISignalEntity {
    Address: IAddressEntity;
    id: number;
    Longitude: number;
    Latitude: number;
    Name: string;
    SignalType: ISignalTypeEntity;
}