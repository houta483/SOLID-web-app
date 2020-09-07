import { Controller, Get, Post, Body, Param, Put, Delete, Header } from '@nestjs/common';
import { SignalsService } from './signals.service';
// import { SignalRepository }  from "iap-persistence";
import { AppGateway } from '../../app.gateway';
import { GeoLocationInformation } from 'iap-domain';


@Controller("Signals")
export class SignalsController {
  constructor(private readonly signalService: SignalsService,) { }
  @Get()
  getAllSignals() {
    return this.signalService.getAllSignals()
  }
  @Get('/movingPoints')
  getMovingPoints() {
    let newCoord:GeoLocationInformation;
    for (let index = 0; index < 10; index++) {
       let tempCoord =  this.signalService.StreamSignalsUpdates(index);
      newCoord = tempCoord[0];
    }
   return newCoord;
    // points.forEach(function(person, index){
    //   setTimeout(function(){
    //       console.log('return person', person)

    //       // this.appGateway.sendMessageToClient(person);
    //       return person;
    //   }, 5000 * (index + 1)); 
    // })
  }
  @Get(':id')
  GetOneSignal(@Param('id') id) {
    return this.signalService.getSingleSignal(id)
  }
  @Get('sst/:id')
  GetSignalWithAddress(@Param('id') id) {
    return this.signalService.getSignalWithST(id)
  }
  @Post()
  @Header('Content-Type', 'application/json')
  SaveSignal(@Body() signal: ISignalDTO) {
    return this.signalService.createSignal(signal);
  }
  @Delete(':id')
  @Header('Content-Type', 'application/json')
  DeleteSignal(@Param('id') id) {
    return this.signalService.deleteSignal(id)
  }
  @Put(':id')
  @Header('Content-Type', 'application/json')
  async UpdateSignal(@Param('id') id, @Body() signalDTO: ISignalDTO) {
    this.signalService.updateSignal(id, signalDTO)
  }
}