import { Carriera } from './carriera';
import { Servizio } from './servizio';

export class Vigile {

    id: number; 
    firstName:string;
    lastName: string;
    birthday:Date;
    phone: string;
    listDrivingLicenses: Number[];
    mail: string;
    postalCode: number;
    address: string;clear
    district: any;
    color: string;
    town: any;
    fiscalCode: any;
    istatProvincia: any;
    istatComune: any;
    codPhone: any;
    servizio?: Servizio;
    mansione?: Carriera;
    assente: boolean;
    noSaltoTurno?: number;

    constructor(
        
        
    ) {
       

    }

}
