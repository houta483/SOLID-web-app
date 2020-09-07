import { SignalType } from "../entity/SignalType";
import { getDatabaseConnection } from "../DatabaseConnection";
import { ISignalTypeEntity } from "iap-domain";

export class SignalTypeRepository {
  constructor() { }

  async SignalType_Save(tempSignalType: SignalType) {
    const connection = await getDatabaseConnection();
    const repo = connection.getRepository(SignalType)
    await repo.save(tempSignalType)
    return tempSignalType
  }

  async SignalType_Delete(id: number) {
    const connection = await getDatabaseConnection();
    const signalRepo = connection.getRepository(SignalType);
    const result = await signalRepo.delete({ id: id });
    return result.affected;
  }

  // this is only for development purposes so I can clean the DB
  async SignalType_DeleteMany(startNum, endNum) {
    const connection = await getDatabaseConnection();
    const signalRepo = connection.getRepository(SignalType);

    for (let i = startNum; i < endNum; i++) {
      await signalRepo.delete({ id: i });
    }
  }

  async SignalType_Get(id: number) {
    const connection = await getDatabaseConnection();
    const repo = connection.getRepository(SignalType);
    const tempAddy = await repo.findOne({ id: id });
    return tempAddy;
  }

  async SignalType_Update(signal: ISignalTypeEntity) {
    const connection = await getDatabaseConnection();
    const signalTypeRepo = connection.getRepository(SignalType);
    const signalTypeIWantToChange = signal
    await signalTypeRepo.save(signalTypeIWantToChange);
    return signalTypeIWantToChange;
  }
}