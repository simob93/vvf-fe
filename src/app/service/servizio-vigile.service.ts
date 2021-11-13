import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/**
 *  Classe di comunicazione tra vigili e servizi, 
 *  all'interno di 2 componenti diversi
 */
export class ServizioVigileService {

  private subject  = new Subject<any> ();

  
  constructor() { }

  setIdVigile(idVigile) {
    this.subject.next(idVigile);
  }

  getVigile():Observable<any> {
    return this.subject.asObservable();
  }
}
