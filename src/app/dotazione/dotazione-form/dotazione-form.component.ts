import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { forkJoin, Observable } from 'rxjs';
import { Articolo, Categoria, Dotazione, Person } from 'src/app/model';
import { MagazzinoService } from 'src/app/service/magazzino.service';
import { mergeMap, map, distinctUntilChanged, filter, debounceTime, switchMap, reduce, takeUntil } from 'rxjs/operators';
import { GeneralService, PersonService, VigileService } from 'src/app/service';
import { formattaData, isValidID, startOfDay } from 'src/app/utils/functions';
import { MessageService } from 'src/app/service/message.service';

import { DATE_TIME_FORMAT_STANDARD } from 'src/app/utils/constant';
import { ReportService } from 'src/app/service/report.service';
import { StandardMessageComponent } from 'src/app/common/standard-message/standard-message.component';
import { MatDialog } from '@angular/material';

@Component({
    selector: 'dotazione-form',
    templateUrl: './dotazione-form.component.html',
    styleUrls: ['./dotazione-form.component.scss']
})
export class DotazioneFormComponent implements OnInit {
    myForm: FormGroup;
    articoli$: Observable<Articolo[]> = null;
    elencoTaglie$: Observable<Person[]> = null;
    elencoCategorie$: Observable<Categoria[]> = null;
    @Input() idVigile: number;

    @Output('afterSave') afterSave: EventEmitter<any> = new EventEmitter<any>()
    @Output('afterDelete') afterDelete: EventEmitter<any> = new EventEmitter<any>()

    constructor(
        private personService: PersonService,
        private fb: FormBuilder,
        private dialog: MatDialog,
        private reportService: ReportService,
        private messageService: MessageService,
        private magazzinoService: MagazzinoService,
        private generalService: GeneralService,
        private vigileService: VigileService
    ) { }

    onClickBtnNuovo() {
        this.myForm.reset();
        this.myForm.markAsDirty();
    }

    onClickBtnElimina() {

        const {
            id
        } = this.myForm.value;

        if (isValidID(id)) {
            this.dialog.open(StandardMessageComponent, {
                data: {
                    type: 'DEL',
                    callbackOnOk: () => {
                        this.vigileService.deleteDotazione(id)
                            .pipe(
                                filter(resp => resp.success)
                            ).subscribe(data => {
                                this.myForm.reset();
                                this.afterDelete.emit();
                            })
                    }
                }
            })
        }
    }

    onClickBtnRipristina() {
        if (this.myForm.value.id) {
            this.caricaDati(this.myForm.value.id)
        } else {
            this.myForm.reset();
        }
    }

    varificaCampi(): boolean {
        const record = this.myForm.value;
        const {
            articolo,
            dataConsegna,
            quantita
        } = record;

        if (!articolo) {
            this.messageService.show({ success: false, message: 'Campo articolo obbligatorio', showDialog: true })
            return false;
        }
        if (!quantita) {
            this.messageService.show({ success: false, message: 'Campo quantità obbligatorio', showDialog: true })
            return false;
        }
        if (!dataConsegna) {
            this.messageService.show({ success: false, message: 'Campo data di consegna obbligatorio', showDialog: true })
            return false;
        }
        return true;
    }
    onClickBtnConferma() {

        const record = this.myForm.value;
        let {
            id,
            dataConsegna,
            articolo
        } = record;

        let newRecord = Object.assign({}, record);

        if (!this.varificaCampi())
            return;

        newRecord.idArticolo = articolo['id'];
        newRecord.idVigile = this.idVigile;

        dataConsegna = startOfDay(dataConsegna, false);
        
        newRecord.dataConsegna = formattaData(dataConsegna, DATE_TIME_FORMAT_STANDARD)
        delete newRecord.articolo;

        if (isValidID(id)) {
            this.vigileService.updateDotazione(newRecord)
                .pipe(
                    filter(resp => resp.success),
                    switchMap(p => this.vigileService.getDotazioneById(id))
                )
                .subscribe(resp => {
                    this.afterSave.emit(resp.data)
                })
        } else {
            this.vigileService.saveDotazione(newRecord)
                .pipe(
                    filter(resp => resp.success)
                )
                .subscribe(resp => {
                    this.afterSave.emit(resp.data)
                })
        }

    }
    /**
     * 
     * @param data 
     * @returns 
     */
    setArticolo(data: Dotazione) {
        return this.magazzinoService.getArticolo(data.idArticolo)
            .pipe(
                filter(resp => resp.success),
                map(resp => resp.data),
                map(articolo => {
                    return Object.assign(data, { articolo })
                }))
    }
    /**
     * 
     * @param data 
     * @returns 
     */
    caricaDipendenze(data: Dotazione) {
        return forkJoin(this.setArticolo(data))
    }
    /**
     * 
     * @param idReg 
     */
    caricaDati(idReg) {
        this.myForm.reset();
        this.vigileService.getDotazioneById(idReg)
            .pipe(
                filter(resp => resp.success),
                map(resp => resp.data),
                switchMap(regDotazione => this.magazzinoService.getArticolo(regDotazione.idArticolo)
                .pipe(
                    filter(resp => resp.success),
                    map(resp => resp.data),
                    map(articolo => {
                        return Object.assign(regDotazione, { articolo: articolo })
                    }))),
            ).subscribe( (data : Dotazione)=> {
                if (data != null) {
                    data['taglia'] = Number(data['taglia']);
                    this.myForm.patchValue(data, {
                        emitEvent: false
                    });
                }
            })
    }

    /**
     * 
     * @param object 
     */
    displayArticolo(object) {
        return object ? object['descrizione'] : null
    }

    onClickBtnStampa() {
        this.reportService.stampaDotazioniVigile(this.idVigile);
    }

    ngOnInit() {
        this.myForm = this.fb.group({
            id: [''],
            idVigile: [''],
            dataConsegna: [''],
            _categoria: ['', Validators.nullValidator],
            idArticolo: [null],
            articolo: [null, Validators.required],
            quantita: [null, Validators.required],
            taglia: [null],
            note: [null]
        })
        this.elencoTaglie$ = this.personService.listByArea(11).pipe(map(p => p.data));

        this.elencoCategorie$ = this.magazzinoService.listCategorie().pipe(map(resp => resp.data));

        this.articoli$ = this.myForm.get('_categoria')
            .valueChanges
            .pipe(
                mergeMap(value => this.magazzinoService.listArticoli(null, null, value).pipe(
                    map(resp => resp.data)
                ))
            )

        /*this.articoli$ = this.myForm.get('articolo')
            .valueChanges
            .pipe(
                filter((value) => value != null),
                distinctUntilChanged(),
                debounceTime(400),
                mergeMap(value => this.magazzinoService.listArticoli(null, value)
                    .pipe(
                        map(resp => resp.data)
                    ))
            )*/

    }

}
