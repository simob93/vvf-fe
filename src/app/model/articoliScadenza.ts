export interface ArticoliScadenza {
    scadenzaId: number;
    articoloId: number;
    note: string;
    effettuata: string;
    dataRinnovo: Date;
    dataScadenza: Date;
    tipoScadenza: number;
}