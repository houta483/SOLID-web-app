import { ISignalTypeEntity } from '../Entities/ISignalTypeEntity';

export interface ISignalTypeRepo {
    SignalType_Save(name: string): Promise<ISignalTypeEntity>;
    SignalType_Save(tempSignalType: ISignalTypeEntity);
    SignalType_Delete(id: number)
    SignalType_DeleteMany(startNum: number, endNum: number)
    SignalType_Get(id: number)
    SignalType_Update(signal: ISignalTypeEntity)
}