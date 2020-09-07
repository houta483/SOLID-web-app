import { Injectable } from '@nestjs/common';
import { AddressRepository } from 'iap-persistence';
import { DomainAddress } from './Models/Address.domain';

@Injectable()
export class AddressService {
  async getSingleAddress(id) {
    let addressRepo = new AddressRepository();
    return addressRepo.Address_Get(id)
  }

  async deleteAddress(id) {
    let addressRepo = new AddressRepository();
    addressRepo.Address_Delete(id)
  }

  async createAddress(address: IAddressDTO): Promise<any> {
    let addressObject = new DomainAddress();
    addressObject.Address = address.Address;
    addressObject.PostalCode = address.PostalCode;

    let addressRepo = new AddressRepository();
    let savedAddress = await addressRepo.Address_SaveAddress(addressObject);
    return savedAddress;
  }

  async updateAddress(address: IAddressDTO) {
    let addressRepo = new AddressRepository();
    let addressObject = new DomainAddress();
    addressObject.Address = address.Address;
    addressObject.PostalCode = address.PostalCode;
    addressObject.id = address.id;

    addressRepo.Address_Update(addressObject);
  }
}
