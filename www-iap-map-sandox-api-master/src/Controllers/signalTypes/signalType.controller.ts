import { Controller, Get, Post, Body, Param, Put, Delete, Header } from '@nestjs/common';
import { SignalTypeService } from './signalType.service'

@Controller('signalType')
export class SignalTypeController {
    constructor(private readonly signalTypeService: SignalTypeService,) { }

    @Get(':id')
    getSingleSignalType(@Param('id') id) {
        return this.signalTypeService.getSingleSignalType(id)
    }

    @Post()
    @Header('Content-Type', 'application/json')
    SaveSignalType(@Body() signalType: ISignalTypeDTO) {
        return this.signalTypeService.addSignalType(signalType)
    }

    @Delete(':id')
    @Header('Content-Type', 'application/json')
    DeleteSignalType(@Param('id') id) {
        return this.signalTypeService.deleteSignalType(id)
    }

    @Put()
    @Header('Content-Type', 'application/json')
    async UpdateSignal(@Body() signalTypeDTO: ISignalTypeDTO) {
        this.signalTypeService.updateSignalType(signalTypeDTO)
    }
}
