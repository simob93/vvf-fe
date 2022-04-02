export interface ArticoliScadenzaList {
    scadenzaId: number;
    articoloId: number;
    tipoScadenza: number;
    descrArticolo: string;
    note: string;
    descrTipoScadenza: string;
    dataRinnovo: Date;
    dataScadenza: Date;
}