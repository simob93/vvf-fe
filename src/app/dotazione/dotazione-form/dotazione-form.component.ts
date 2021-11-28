import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { Articolo, Dotazione } from 'src/app/model';
import { MagazzinoService } from 'src/app/service/magazzino.service';
import { mergeMap, map, distinctUntilChanged, filter, debounceTime, switchMap, reduce } from 'rxjs/operators';
import { VigileService } from 'src/app/service';
import { formattaData, isValidID } from 'src/app/utils/functions';
import { MessageService } from 'src/app/service/message.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { DATE_FORMAT_STANDARD, DATE_TIME_FORMAT_STANDARD } from 'src/app/utils/constant';

@Component({
    selector: 'dotazione-form',
    templateUrl: './dotazione-form.component.html',
    styleUrls: ['./dotazione-form.component.scss']
})
export class DotazioneFormComponent implements OnInit {
    myForm: FormGroup;
    articoli$: Observable<Articolo[]> = null
    @Input() idVigile: number;
    @Output('afterSave') afterSave: EventEmitter<any> = new EventEmitter<any>()
    constructor(
        private fb: FormBuilder,
        private messageService: MessageService,
        private magazzinoService: MagazzinoService,
        private store: Store<AppState>,
        private vigileService: VigileService
    ) { }

    onClickBtnNuovo() {
        this.myForm.reset();
        this.myForm.markAsDirty();
    }

    onClickBtnElimina() {


    }

    onClickBtnRipristina() {
        if(this.myForm.value.id) {
            this.caricaDati(this.myForm.value.id)
        } else {
            this.myForm.reset();
        }
    }

    varificaCampi() : boolean {
        const record = this.myForm.value;
        const {
            articolo,
            dataConsegna,
            quantita
        } = record;

        if (!articolo) {
            this.messageService.show({success: false, message: 'Campo articolo obbligatorio', showDialog: true})
            return false;
        }
        if (!quantita) {
            this.messageService.show({success: false, message: 'Campo quantità obbligatorio', showDialog: true})
            return false;
        }
        if (!dataConsegna) {
            this.messageService.show({success: false, message: 'Campo data di consegna obbligatorio', showDialog: true})
            return false;
        }
        return true;
    }
    onClickBtnConferma() {

        const record = this.myForm.value;
        const {
            id,
            dataConsegna,
            articolo
        } = record;

        let newRecord = Object.assign({}, record);

        if (!this.varificaCampi()) 
            return;

        newRecord.idArticolo = articolo['id'];
        newRecord.idVigile = this.idVigile;
        newRecord.dataConsegna = formattaData(dataConsegna, DATE_TIME_FORMAT_STANDARD)
        delete newRecord.articolo;

        if (isValidID(id)) {
            this.vigileService.updateDotazione(newRecord)
                .pipe(
                    filter(resp => resp.success)
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
                switchMap(regDotazione => this.caricaDipendenze(regDotazione)),
            ).subscribe(data => {
                if (data != null) {
                    this.myForm.patchValue(data[0], {
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

    ngOnInit() {
        this.myForm = this.fb.group({
            id: [''],
            idVigile: [''],
            dataConsegna: [''],
            idArticolo: [null],
            articolo: [null,  Validators.required],
            quantita: [null, Validators.required],
            taglia: [null],
            note: [null]
        })

        this.articoli$ = this.myForm.get('articolo')
            .valueChanges
            .pipe(
                filter((value) => value != null),
                distinctUntilChanged(),
                debounceTime(400),
                mergeMap(value => this.magazzinoService.listArticoli(null, value)
                    .pipe(
                        map(resp => resp.data)
                    ))
            )

    }

}
