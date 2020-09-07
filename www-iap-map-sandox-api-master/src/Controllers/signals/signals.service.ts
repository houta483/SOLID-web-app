import { Injectable } from '@nestjs/common';
import { DomainAddress } from '../Address/Models/Address.domain';
import { AddressRepository, SignalRepository, SignalTypeRepository, DummyDataRepository } from 'iap-persistence';
import { ISignalEntity, GeoLocationInformation } from 'iap-domain';
import { DomainAddress } from '../Address/Models/Address.domain';
import { DomainSignal } from './models/Signal.domain';

@Injectable()
export class SignalsService {
    async getAllSignals() {
        let signalRepo = new SignalRepository();
        return signalRepo.Signal_GetAll();
    }

    async getSingleSignal(id) {
        let signalRepo = new SignalRepository();
        return signalRepo.Signal_Get(id);
    }

    async createSignal(signal: ISignalDTO): Promise<any> {
        let tempAddy = new DomainAddress();
        tempAddy.Address = signal.Address;
        tempAddy.PostalCode = signal.PostalCode;
        let addyRepo = new AddressRepository();
        let savedAddy = await addyRepo.Address_SaveAddress(tempAddy);
        let sigTypeRepo = new SignalTypeRepository();
        let savedSignalType = await sigTypeRepo.SignalType_Get(signal.SignalType)
        let tempSignal = new DomainSignal();
        tempSignal.Latitude = signal.Latitude;
        tempSignal.Longitude = signal.Longitude;
        tempSignal.Name = signal.Name;
        tempSignal.Address = tempAddy;
        tempSignal.SignalType = savedSignalType
        let signalRepo = new SignalRepository();
        let savedSignal = await signalRepo.Signal_SaveSignal(tempSignal);
        return { "signal": savedSignal, "address": savedAddy };
    }

    async deleteSignal(id) {
        let signalRepo = new SignalRepository();
        const returnJSON = await signalRepo.Signal_Delete(id);
        return returnJSON;
        let addressRepo = new AddressRepository();
        // addressRepo.Address_Delete(id)
    }

    async StreamSignalsUpdates(index:number): Promise<GeoLocationInformation>{
        let dataRepo = new DummyDataRepository();
        let data = await dataRepo.Dummy_RetrieveGeoData(index);
        return data[0];
    }

    async updateSignal(id: number, signalDTO: ISignalDTO) {
        let signalRepo = new SignalRepository();
        let mappedObject = new DomainSignal();
        mappedObject.Longitude = signalDTO.Longitude;
        mappedObject.Latitude = signalDTO.Latitude;
        mappedObject.id = id;
        mappedObject.Name = signalDTO.Name;
        // mappedObject.SignalType = signalDTO.SignalType
        let addressObject = new DomainAddress();
        addressObject.Address = signalDTO.Address;
        addressObject.PostalCode = signalDTO.PostalCode;
        addressObject.id = id;
        mappedObject.Address = addressObject
        signalRepo.Signal_Update(mappedObject);
    }

    async getSignalWithST(id: number) {
        let signalRepo = new SignalRepository();
        return signalRepo.Signal_GetWithST(id);
    }
}
