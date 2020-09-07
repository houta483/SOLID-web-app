import { ISignalEntity } from "../Entities/ISignalEntity";

export interface ISignalRepo {
    Signal_SaveSignal(signal: ISignalEntity);
    Signal_Get(id: number);
    Signal_Delete(id: number);
    Signal_Update(signal: ISignalEntity);
    Signal_GetWithST(id: number)
}