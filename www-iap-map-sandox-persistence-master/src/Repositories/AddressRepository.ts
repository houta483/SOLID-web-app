import { Address } from "../entity/Address";
import { IAddressRepo } from "iap-domain";
import { IAddressEntity } from "iap-domain";
import { getDatabaseConnection } from "../DatabaseConnection";

export class AddressRepository implements IAddressRepo {
    constructor() { }

    async Address_SaveAddress(address: IAddressEntity) {
        const connection = await getDatabaseConnection();
        const repo = connection.getRepository(Address)
        const result = await repo.save(address)
        return result.id
    }

    async Address_Delete(id: number) {
        const connection = await getDatabaseConnection();
        const addressRepo = connection.getRepository(Address);
        const result = await addressRepo.delete({ id: id });
        return result.affected;
    }

    async Address_DeleteAll(startNum, endNum) {
        const connection = await getDatabaseConnection();
        const addressRepo = connection.getRepository(Address);

        for (let i = startNum; i < endNum; i++) {
            await addressRepo.delete({ id: i });
        }
        return `Deleted Addresses from index ${startNum} to ${endNum}`
    }

    async Address_Get(id: number) {
        const connection = await getDatabaseConnection();
        const repo = connection.getRepository(Address);
        const tempAddy = await repo.findOne({ id: id });
        return tempAddy;
    }

    async Address_Update(address: IAddressEntity) {
        const connection = await getDatabaseConnection();
        const addressRepo = connection.getRepository(Address);
        const addressIWantToChange = await addressRepo.findOne({ id: address.id });

        addressIWantToChange.Address = address.Address;
        addressIWantToChange.PostalCode = address.PostalCode;

        await addressRepo.save(addressIWantToChange);
        return addressIWantToChange;
    }
}