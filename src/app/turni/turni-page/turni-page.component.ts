import { Component, OnInit, OnDestroy } from '@angular/core';
import { TurniService } from 'src/app/service/turni-service.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, Subject, throwError } from 'rxjs';
import { map, share, tap, catchError, takeUntil, filter, switchMap } from 'rxjs/operators';
import { MessageService } from 'src/app/service/message.service';
import * as moment from 'moment';
import { MatDialog } from '@angular/material';
import { TurniOptStampaComponent } from '../turni-opt-stampa/turni-stampa.component';
import { CATCH_ERROR_VAR } from '@angular/compiler/src/output/output_ast';
import { resultMemoize } from '@ngrx/store';

@Component({
    selector: 'app-turni-page',
    templateUrl: './turni-page.component.html',
    styleUrls: ['./turni-page.component.scss']
})
export class TurniPageComponent implements OnInit, OnDestroy {
    myForm: FormGroup;
    listTurni$: Observable<any> = null;
    //displayedColumns: string[] = ['icon', 'Giorno', 'data', 'nomeVigile', 'grado', 'numeroTelefonico', 'letteraVigile', 'noteServizio'];
    displayedColumns: any = [
        //{ field: 'icon' },
        { headerName: 'Giorno', field: 'descrGiornoSettimana' },
        { headerName: 'Data turno', field: 'data', valueFormatter:(params) => params['value'] && moment(params['value']).format('DD/MM/YYYY')},
        { headerName: 'Vigile', field: 'descrVigile' },
        { headerName: 'Grado', field: 'descrGrado' },
        { headerName: 'Codice Tel.', field: 'codiceTelefono' },
        { headerName: 'Lettera', field: 'letteraVigile' },
        { headerName: 'Note', field: 'note', flex: 1, }
    ]
    squadraTurno: Subject<String> = new Subject();
    private _destroyed: Subject<String> = new Subject();
    constructor(
        private formBuilder: FormBuilder,
        private turniSrvice: TurniService,
        private messageService: MessageService,
        private dialog: MatDialog
    ) { }
    ngOnDestroy(): void {
        this.squadraTurno.next();
        this.squadraTurno.complete()
        this._destroyed.next();
        this._destroyed.complete();
    }

    filterDate = (date) :boolean => {
        let dateCalendar = moment(date);
        let start = moment(this.myForm.get('dal').value);
        let limit = moment(start.add(6, 'days'));
        return ( dateCalendar.isSame(start) || (dateCalendar.isAfter(start) && !dateCalendar.isAfter(limit)) );
    }
    /**
     * viene generato un nuovo turnario 
     * @param dal 
     * @param al 
     */
    generaNuovoTurnario(dal, al) {

        if (!dal || !al) return;

        this.listTurni$ = this.turniSrvice.calc({ dal, al })
            .pipe(
                tap(result => {
                    if (!result.success) { 
                        this.messageService.show({ message: result.message[0]['testo'], showDialog: true, success: false });
                        throw new Error( result.message[0]['testo'] );
                    }
                }),
                switchMap(response => this.trovaTurni())
            );
    }

    getMonday(date) {
        if (!!date) {
            return date.weekday(0).toDate();
        }
        return '';
    }

    getSunday(date) {
        if (!!date) {
            return date.weekday(6).toDate();
        }
        return '';
    }
    /**
     *  vengono ricercati i turni pianificati
     */
    trovaTurni() {

        let {
            dal,
            al
        } = this.myForm.value;

        if (!dal || !al) return;

        dal = dal.format('YYYY-MM-DD');
        al = al.format('YYYY-MM-DD');

        this.turniSrvice.getTurnario({dal, al}).pipe(
            filter(resp => resp.success),
            map(resp=> resp.data),
        ).subscribe(data => {  
            console.log(data.map(turno => turno.letteraVigile));
        });

        return this.turniSrvice.calc({dal, al}).pipe(
            tap(result => {
                if (!result.success) { 
                    this.squadraTurno.next("");
                    this.messageService.show({ message: result.message[0]['testo'], showDialog: true, success: false });
                    throw new Error( result.message[0]['testo'] );
                }
            }),
            map(response => response['data']),
            map(data => {
                this.squadraTurno.next((data && data.length > 0 ? data[0]['descrSquadra'] : ""));
                return data;
            }));
    }

    onClickBtnSearch() {
        this.listTurni$ = this.trovaTurni();
    }

    onClickBtnPrint() {
        this.dialog.open(TurniOptStampaComponent);
    }
    
    ngOnInit() {


        this.myForm = this.formBuilder.group({
            dal: [moment().startOf('isoWeek')],
            al: [moment().endOf('week')]
        });

        
        this.listTurni$ = this.trovaTurni();

    }

}
