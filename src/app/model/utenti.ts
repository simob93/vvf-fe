export interface Utente {
    id: number;
	nome: String;
	cognome: String;
    email: String;
	username: String;
	abilitato: boolean;
    primoAcesso: boolean;   
    ruolo: UtenteRuolo[]
}

export interface UtenteRuolo {
    id: number;
	idUtente: number;
	idRuolo: number;
}