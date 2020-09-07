import { getRepository, getConnection } from "typeorm";
import { ISignalEntity } from "iap-domain";
import { ISignalRepo } from "iap-domain";
import { Signal } from "../entity/Signal";
import { getDatabaseConnection } from "../DatabaseConnection";

export class SignalRepository implements ISignalRepo {
    constructor() { }

    async Signal_SaveSignal(signal: ISignalEntity) {
        const connection = await getDatabaseConnection();
        const signalRepo = connection.getRepository(Signal)
        await signalRepo.save(signal);
        return signal.id;
    }
    async Signal_Get(signalid: number) {
        const connection = await getDatabaseConnection();
        const signalRepo = connection.getRepository(Signal)
        const tempSignal = await signalRepo.findOne({ id: signalid })
        return tempSignal.id;
    }
    async Signal_GetAll() {
        const connection = await getDatabaseConnection();
        const signalRepo = connection.getRepository(Signal)
        const tempSignal = await signalRepo.find();
        return tempSignal;
    }
    async Signal_Delete(id: number) {
        const connection = await getDatabaseConnection();
        const signalRepo = connection.getRepository(Signal);

        try {
            const address = await getRepository(Signal)
                .createQueryBuilder('addressId')
                .innerJoinAndSelect("addressId", "id")
                .getMany()

            console.log(address)
        }

        catch {
            console.log('query didnt work')
        }
        const result = await signalRepo.delete({ id: id });
        return result.affected;
    }
    async Signal_Update(signal: ISignalEntity) {
        const connection = await getDatabaseConnection();
        const signalRepo = connection.getRepository(Signal);
        const signalIWantToChange = await signalRepo.findOne({ id: signal.id });
        signalIWantToChange.Name = signal.Name;
        signalIWantToChange.Latitude = signal.Latitude;
        signalIWantToChange.Longitude = signal.Longitude;
        await signalRepo.save(signalIWantToChange);
        return signalIWantToChange;
    }

    async Signal_GetWithST(id: number) {
        const connection = await getDatabaseConnection();
        connection
        // .createQueryBuilder("signal")
        // .innerJoinAndSelect("signal.signalType", "st")

        // .innerJoinAndSelect("")

        // select s."Latitude", s."Longitude", s."Name", st."SignalTypeName"
        // from public.signal as s
        // join public.signal_type as st on (s."signalTypeId" = st.id)
        // join public.address as a on (s."addressId" = a.id);

        // return signalWithST;
    }
}