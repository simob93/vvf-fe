import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Grado } from 'src/app/model';
import { GradoService } from 'src/app/service/grado.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { FormGradoComponent } from '../form-grado/form-grado.component';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import * as GradiAction from '../../actions/gradi.action';
import { map } from 'rxjs/operators';


@Component({
    selector: 'app-list-gradi',
    templateUrl: './list-gradi.component.html',
    styleUrls: ['./list-gradi.component.scss']
})
export class ListGradiComponent implements OnInit {

    @Input() idVigile: number;
    @Output() afterOperation: EventEmitter<any> = new EventEmitter<any>();

    private _idServizio: number;

    @Input()
    public get idServizio(): number {
        return this._idServizio;
    }
    public set idServizio(value: number) {
        this._idServizio = value;
        if (value) {
            this.fetchData();
        }

    }

    listGradi$: Observable<Grado[]>;
    displayedColumns: String[] = ['dal', 'al', 'gradoFormatted', 'detail'];
    constructor(
        private store: Store<AppState>,
        private dialog: MatDialog
    ) {
        this.listGradi$ = this.store.select(reducers => reducers.listGradiReducer).pipe(map(data => data['data']));
     }
    /**
     * 
     * @param assenza 
     */
    onClickEditGrado(grado: Grado) {
        if (!grado) {

            grado = Object.assign({}, {
                idVigile: this.idVigile,
                idServizio: this.idServizio
            })
        }
        let dialogRef = this.dialog.open(FormGradoComponent, {
            data: {
                grado
            }
        })
        dialogRef.afterClosed().subscribe(() => {
            this.afterOperation.emit();
            this.fetchData()
        })
    }

    onAfterOperation() {
        this.fetchData();
    }

    fetchData() {
        this.store.dispatch(new GradiAction.FetchingAction(this.idServizio))
    }

    ngOnInit() {
        //this.fetchData();

    }

}
