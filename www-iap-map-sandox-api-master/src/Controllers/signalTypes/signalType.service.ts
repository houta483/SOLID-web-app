import { Injectable } from '@nestjs/common';
import { SignalTypeRepository } from 'iap-persistence';
import { SignalTypeDomain } from '../signalTypes/models/SignalType.domain';
import { SignalTypeDTO } from '../signalTypes/models/SignalType.dto'

@Injectable()
export class SignalTypeService {
  async getSingleSignalType(id) {
    let signalTypeRepo = new SignalTypeRepository();
    return signalTypeRepo.SignalType_Get(id)
  }

  async deleteSignalType(id) {
    let signalTypeRepo = new SignalTypeRepository();
    signalTypeRepo.SignalType_Delete(id)
  }

  async addSignalType(signalType: SignalTypeDTO): Promise<any> {
    let newSignalType = new SignalTypeDomain();
    newSignalType.SignalTypeID = signalType.SignalTypeID;
    newSignalType.SignalTypeName = signalType.SignalTypeName;
    let signalTypeRepo = new SignalTypeRepository();
    signalTypeRepo.SignalType_Save(newSignalType)
  }

  async updateSignalType(signalTypeDTO: ISignalTypeDTO) {
    let signalTypeRepo = new SignalTypeRepository();
    let signalTypeObject = new SignalTypeDomain();
    signalTypeObject.SignalTypeID = signalTypeDTO.SignalTypeID
    signalTypeObject.SignalTypeName = signalTypeDTO.SignalTypeName
    signalTypeObject.id = signalTypeDTO.id
    signalTypeRepo.SignalType_Update(signalTypeObject);
  }
}
