


export type BtnMessageType = "YES" | "NO" | "CANCEL" | "OK";
export type TrueFalseType = "T"|"F";

class VideateProgramma {
    id: number;
    descr: string; 
    constructor(id: number, descr: string) {
        this.id = id;
        this.descr = descr;
    }
}

export const DATE_FORMAT_STANDARD = "YYYY-MM-DD";
export const DATE_TIME_FORMAT_STANDARD = "YYYY-MM-DD HH:mm:ss";

export const COD_VIDEATA_TURNARIO : number = 11;
export const COD_VIDEATA_SCADENZE : number = 3;
export const COD_VIDEATA_PROTOCOLLI : number = 2;
export const COD_VIDEATA_IMPOSTAZIONI : number = 4;
export const COD_VIDEATA_CRUSCOTTO_VIGILI : number = 6;
export const  COD_VIDEATA_MANSIONI : number = 7;
export const COD_VIDEATA_SERVIZI : number = 8;
export const COD_VIDEATA_PATENTI : number = 9;
export const COD_VIDEATA_AUTORIZZAZIONI : number = 10;
export const COD_VIDEATA_ANAGRAFICA : number = 12;
export const COD_VIDEATA_GEST_VIGILI : number = 1;
export const COD_VIDEATA_ASSENZE : number = 13;
export const COD_VIDEATA_ACCOUNT : number = 14;



