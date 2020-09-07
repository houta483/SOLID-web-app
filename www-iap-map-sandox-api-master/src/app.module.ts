import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SignalsController } from './Controllers/signals/signals.controller';
import { SignalsModule } from './Controllers/signals/signals.module';
import { SignalsService } from './Controllers/signals/signals.service';
import { AddressService } from './Controllers/Address/address.service';
import { AddressController } from './Controllers/Address/address.controller';
import { SignalTypeController } from './Controllers/signalTypes/signalType.controller'
import { SignalTypeService } from './Controllers/signalTypes/signalType.service'
import { AppGateway } from './app.gateway'

@Module({
  imports: [SignalsModule],
  controllers: [AppController, SignalsController, AddressController, SignalTypeController],
  providers: [AppService, SignalsService, AddressService, SignalTypeService]

export class AppModule { }
