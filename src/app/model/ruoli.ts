import { RuoliPermessi } from './ruoliPermessi';


export interface Ruoli {
    id: number;
    descrizione:string;
    ruoliPermessi?: RuoliPermessi[]
}