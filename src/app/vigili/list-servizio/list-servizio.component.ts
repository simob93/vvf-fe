import { Component, OnInit, Input } from '@angular/core';
import { Servizio, Grado } from '../../model';

import { 
    ServizioService, 
} from '../../service';
import { ActivatedRoute } from '@angular/router';

import {
    MatDialog
} from '@angular/material';

import * as ServizioAction from '../../actions/serviziAction';
import * as GradiAction from '../../actions/gradi.action';

import { AppState } from '../../reducers';
import { Store } from '@ngrx/store';
import { AppFetchState } from '../../state';


@Component({
    selector: 'app-list-servizio',
    templateUrl: './list-servizio.component.html',
    styleUrls: ['./list-servizio.component.scss'],
    providers: [ServizioService]
})
export class ListServizioComponent implements OnInit {
    

    listServizi: Servizio[];
    displayedColumns: string[] = ['dateStart', 'dateEnd', 'grado', 'letter', 'idTeam'];
    state: AppFetchState;
    recServizio: Servizio = {} as Servizio;
    selectedRowIndex: number = -1;
    @Input() idVigile: number;

    constructor(
        private activeRoute: ActivatedRoute,
        private dialog: MatDialog,
        private store: Store<AppState>
    ) {

        this.store.select(reducer => reducer.listServiziReducer)
        .subscribe((state: AppFetchState) => {
            this.listServizi = state['data'];
            this.state = state;
        });

    }
    onAfterOperation() {
        this.store.dispatch(new ServizioAction.FetchingAction(this.idVigile))
        if(this.recServizio && this.recServizio.id) {
            this.store.dispatch(new GradiAction.FetchingAction(this.recServizio.id))
        }

    }

    /**
   * 
   * @param assenza 
   */
    onClickEdit(servizio: Servizio) {
        this.selectedRowIndex = servizio.id;
        this.recServizio = Object.assign({}, servizio);
    }


    ngOnInit() {
        this.store.dispatch(new ServizioAction.FetchingAction(this.idVigile))

    }
}
