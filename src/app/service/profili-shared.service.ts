import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class GestProfiliService {

    private _onGetProfiloSel: BehaviorSubject<any> = new BehaviorSubject(null);
    private _onUpdateProfili: BehaviorSubject<any> = new BehaviorSubject(null);
    
    nextProfili = this._onUpdateProfili.asObservable();
    nextProfilo = this._onGetProfiloSel.asObservable();

    constructor() {}

    setProfilo(idProfilo: number)  {
        this._onGetProfiloSel.next(idProfilo);
    }

    getProfiloSel() {
        return this._onGetProfiloSel.getValue();
    }

    refershProfili(id) {
        this._onUpdateProfili.next(id);
    }
}