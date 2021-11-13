import { Component, OnInit, Inject, Output, EventEmitter, Input  } from '@angular/core';
import { Servizio, Team, Area } from '../../model';
import { TeamService, ServizioService, GeneralService, PersonService } from '../../service';
import { Observable, forkJoin, Subject } from 'rxjs';
import {
    MatDialog
} from '@angular/material';

import 'moment/locale/it';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { StandardMessageComponent } from 'src/app/common/standard-message/standard-message.component';
import {map, startWith, switchMap, filter, takeUntil} from 'rxjs/operators';
import { startOfDay, sommaDataOra, formattaData } from 'src/app/utils/functions';
import * as moment from 'moment';

 @Component({
    selector: 'app-form-servizio',
    templateUrl: './form-servizio.component.html',
    styleUrls: ['./form-servizio.component.scss'],
    providers: [TeamService, ServizioService]
})

export class FormServizioComponent implements OnInit {
    myForm: FormGroup;

    listLetters$: Observable<any[]> = null;
    listTeam$: Observable<any[]> = null;
    listGradi$: Observable<any[]> = null;
    _onDestroy: Subject<any> = new Subject();

    @Input() idVigile: number;
    private _record: Servizio;
    get record(): Servizio {
        return this._record;
    }
    @Input() set record(value: Servizio) {
        this._record = value;

        if (value.id) {
            this.myForm.reset();
            this.loadData(value);
        }
    }
    @Output() afterOperation: EventEmitter<any> = new EventEmitter<any>();

    constructor(
        private dialog: MatDialog,
        private formBuilder: FormBuilder,
        private personService: PersonService,
        private teamService: TeamService,
        private servizioService: ServizioService
    ) { }
    ngAfterViewInit(): void {

    }
    ngOnDestroy(): void {

      this._onDestroy.next();
      this._onDestroy.complete();
    }

    onClickBtnNuovo() {
        this.record.id = null;
        this.myForm.reset();
        this.myForm.markAsDirty();

        this.myForm.patchValue({
            dateStart: moment(),
            dalle: moment().format('HH:mm')
        })
    }

    onClickBtnRipristina() {
        this.myForm.reset();
    }

    onClickBtnElimina() {

        let id = this.myForm.get('id').value;

        if (!id) {
            this.dialog.open(StandardMessageComponent, {
                data: {
                    message: 'Nessun dato selezionato',
                    btns: ["OK"]
                }
            })
            return false;
        }

        this.dialog.open(StandardMessageComponent, {
            data: {
                type: 'DEL',
                callbackOnOk: () => {
                    this.servizioService.delete(id)
                    .subscribe(data =>{
                        if (data['success']) {
                            this.record.id = null;
                            this.afterOperation.emit()
                            this.myForm.reset();
                        }
                    });
                }
            }
        });

    }

    onClickBtnConferma() {
        let valueForm = Object.assign({}, this.myForm.value);
        const {
            id
        } = valueForm;

        Object.assign(valueForm, {
            idVigile: this.idVigile
        })

        valueForm.dateStart = formattaData(sommaDataOra(valueForm.dateStart, valueForm.dalle));
        if ( !!valueForm.dateEnd ) {
            valueForm.dateEnd = formattaData(sommaDataOra(valueForm.dateEnd, valueForm.alle));
        }
        if (!id)
            this.servizioService.save(valueForm)
            .subscribe(data => {
                if (data['success']) {
                    Object.assign(this.record, {...data['data']});

                    this.loadData(data['data'])
                    this.afterOperation.emit();
                }
            } );
        else
            this.servizioService.update(valueForm)
            .subscribe(data => {
                if (data['success']) {
                    this.loadData(data['data'])
                    this.afterOperation.emit();
                }
            });
    }
    /**
     *
     * @param data
     */
    loadData(data: Servizio) {
        this.myForm.reset();
        this.myForm.patchValue(data, /* { emitEvent: false }*/);

        this.myForm.patchValue({
            dalle: data.dateStart && moment(data.dateStart).format('HH:mm'),
            alle: data.dateEnd && moment(data.dateEnd).format('HH:mm'),
        }, /*{ emitEvent: false }*/);
    }

    ngOnInit() {

        this.listTeam$ = this.personService.listByArea(10).pipe(map(resp => resp['data']) );
        this.listGradi$ = this.personService.listByArea(3).pipe(map(resp => resp['data']) );
        // definizione capi form
        this.myForm = this.formBuilder.group({
            id:           [],
            idVigile:     [],
            dalle:        ['', [Validators.required]],
            alle:         [],
            dateStart:    ['', [Validators.required]],
            dateEnd:      [''],
            grado:        [''],
            idTeam:       [''],
            letter:       [''],
            note:         ['']
        });

        this.myForm.get('dateEnd')
        .valueChanges
        .pipe(
            takeUntil(this._onDestroy),
        ).subscribe(value => {
            console.log("entrato")
            let cmpAlle = this.myForm.get('alle');
            if ( value &&  !cmpAlle.value) {
                cmpAlle.setValue(moment().format('HH:mm'));
            }
        })

        // dovrebbe ritorna la lista delle lettere disponibili per la squadra passata
        this.listLetters$ = this.myForm.get('idTeam')
            .valueChanges
            .pipe(
                startWith(''),
                filter(data => data != null),
                switchMap(idSquadra =>  this.teamService.listLettere(idSquadra)
                .pipe(
                    map(resp => {
                        let lettere = resp['data'];
                        if (this.myForm.get('id').value) {
                            lettere.push(this.myForm.get('letter').value)
                        }
                        return lettere;
                    }))));
    }

}
