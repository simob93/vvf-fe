import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Articolo } from '../model';

@Injectable()
export class ArticoloSharedService {

    private articoloSel: BehaviorSubject<any> = new BehaviorSubject(null);
    articoloNext$ = this.articoloSel.asObservable();

    constructor() {}

    /**
     * 
     * @param idArticolo 
     */
    nextArticolo(id: number)  {
        this.articoloSel.next(id);
    }

    getArticolo() {
        return this.articoloSel.getValue();
    }
}