import { IAddressEntity } from "./IAddressEntity";

export interface ISignalEntity{
    id:number;
    Longitude: number;
    Latitude: number;
    Name: string;
    Address:IAddressEntity;
   
}