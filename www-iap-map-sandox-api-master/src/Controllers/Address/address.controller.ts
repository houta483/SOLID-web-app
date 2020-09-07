import { Controller, Get, Post, Body, Param, Put, Delete, Header } from '@nestjs/common';
import { AddressService } from './address.service'

@Controller('address')
export class AddressController {
    constructor(private readonly addressService: AddressService,) { }

    @Get(':id')
    getSingleAddress(@Param('id') id) {
        return this.addressService.getSingleAddress(id)
    }

    @Post()
    @Header('Content-Type', 'application/json')
    SaveAddress(@Body() address: IAddressDTO) {
        return this.addressService.createAddress(address)
    }

    @Delete(':id')
    @Header('Content-Type', 'application/json')
    DeleteAddress(@Param('id') id) {
        return this.addressService.deleteAddress(id)
    }

    @Put()
    @Header('Content-Type', 'application/json')
    async UpdateAddress(@Body() signalDTO: IAddressDTO) {
        this.addressService.updateAddress(signalDTO)
    }
}
