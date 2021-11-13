
import * as moment from 'moment';
import 'moment/locale/it';

export class Servizio {

    id: number; 
    dateStart:Date;
    dateEnd: Date;
    idTeam:number;
    teamFormatted: string;
    grado: number;
    gradoFormatted: string;
    letter: string;
    idVigile: number;

    constructor(
        id: number, 
        dateStart:Date,
        dateEnd: Date,
        idTeam:number,
        letter: string,
        idVigile: number,
    ) {

        this.id = id;
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
        this.idTeam = idTeam;
        this.letter = letter;
        this.idVigile = idVigile;        
    }
}
