import { Articolo } from ".";

export interface Dotazione {
    id: number;
    idArticolo: string;
    idVigile: number;
    quantita: number;
    note: string;
    taglia: number;
    dataConsegna: Date;
    articolo: Articolo;

}