import { SettingScadenza } from '.';

export class Person {
    
    id: number;
    name:string;
    enabledExpiry: number;
    scadenza: SettingScadenza = null;  
    constructor(
       
    ) {
       
    }
}


export class PersonScadenze {
    
    id: number;
    number: number;
    idPerson:number;
    date: Date;
    dateExpiration: Date;
    constructor(
       
    ) {
       
    }
}


