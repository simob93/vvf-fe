import {Component, OnInit, Inject, OnDestroy, ViewChild, AfterViewInit} from '@angular/core';
import { Protocol, Town, City } from '../../model';
import { GeneralService, PersonService } from '../../service';
import { ProtocolliServiceService } from '../../service/protocolli-service.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatAutocompleteTrigger, MatSelectTrigger, MatSelect } from '@angular/material';
import {forkJoin, of, Observable, Subject, combineLatest} from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {filter, map, startWith, switchMap, takeUntil, tap} from 'rxjs/operators';
import { formattaData } from 'src/app/utils/functions';

interface KeyValue {
    codice: number | string;
    valore: string;
}

@Component({
    selector: 'app-portocolli-edit',
    templateUrl: './portocolli-edit.component.html',
    styleUrls: ['./portocolli-edit.component.scss']
})
export class PortocolliEditComponent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChild('txtNumFaldone', {read:MatAutocompleteTrigger}) cmpNumFaldone : MatAutocompleteTrigger
    @ViewChild('txtDescFaldone', {read:MatAutocompleteTrigger}) cmpDescFaldone : MatAutocompleteTrigger 
    @ViewChild('txtDescEnte', {read:MatAutocompleteTrigger}) cmpDescEnte : MatAutocompleteTrigger 

    myForm: FormGroup;

    listFaldoni$: Observable<any> = null;
    listEnti$: Observable<any> = null;
    listProvincie$: Observable<any> = null;
    listComuni$: Observable<any> = null;
    tmpListaFaldoni: Subject<any> = new Subject<any>();
    tmpListaEnti: Subject<any> = new Subject<any>();
    private _destroyed: Subject<any> = new Subject<any>();

    listType$: Observable<KeyValue[]> = of([
        {
            codice: 'E',
            valore: 'Entrata'
        },
        {
            codice: 'U',
            valore: 'Uscita'
        }
    ]);

    listTypology$: Observable<KeyValue[]> = of([
        {
            codice: 1,
            valore: 'Fax'
        },
        {
            codice: 2,
            valore: 'Lettera'
        },
        {
            codice: 3,
            valore: 'Circolare'
        },
        {
            codice: 4,
            valore: 'Raccomandata'
        },
        {
            codice: 5,
            valore: 'Modulo'
        },
        {
            codice: 6,
            valore: 'Allegato'
        },
        {
            codice: 7,
            valore: 'Email'
        },
        {
            codice: 8,
            valore: 'Depliant'
        },
        {
            codice: 9,
            valore: 'Telegramma'
        },
        {
            codice: 10,
            valore: 'Cartolina'
        },
        {
            codice: 11,
            valore: 'Invito'
        },
        {
            codice: 12,
            valore: 'Espresso'
        },
        {
            codice: 13,
            valore: 'Varie'
        },
        {
            codice: 14,
            valore: 'Verbale'
        },
        {
            codice: 15,
            valore: 'Fascicolo'
        },
        {
            codice: 16,
            valore: 'Tabella'
        }
    ]);

    constructor(
        private generalService: GeneralService,
        private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data,
        private dialogRef: MatDialogRef<PortocolliEditComponent>,
        private protocolService: ProtocolliServiceService,
        private peronService: PersonService) {
    }


    abilitaSelezioneConTab(cmp, controlName) {
        cmp.panelClosingActions
        .pipe(takeUntil(this._destroyed))
        .subscribe(v => {
          if (cmp.activeOption)  {
                controlName.setValue(cmp.activeOption.value)
          }
        })
    }

    ngAfterViewInit(): void {
        this.abilitaSelezioneConTab(this.cmpNumFaldone, this.myForm.get('_tmp_archives'));
        this.abilitaSelezioneConTab(this.cmpDescFaldone, this.myForm.get('idArchive'));
        this.abilitaSelezioneConTab(this.cmpDescEnte, this.myForm.get('idOrganization'));
        
    }

    exit(object) {
        if (object.success) {
            const fn = this.data.callbackFn;
            if (fn) {
                fn();
                this.dialogRef.close();
            }
        }
    }

    onClickBtnSave() {

        const record = Object.assign({}, this.myForm.value);

        const {
            id
        } = record;

        record.date= formattaData(record.date);
        record.dateProtocolIn =  formattaData(record.dateProtocolIn);
        record.dateProtocol = formattaData(record.dateProtocol);
        record.idArchive = record.idArchive && record.idArchive.id;
        record.idOrganization = record.idOrganization &&  record.idOrganization.id;

        delete record._tmp_archives;

        if (id) {
            this.protocolService.update( record ).subscribe((resp) => {
                // this.exit(resp);
            });
        } else {
            this.protocolService.save( record ).subscribe((resp) => {
                this.exit(resp);
            });
        }
    }

    displayNrFaldoneFn(option): any {
        return option && option.extra ? option.extra : '';
    }

    displayFn(option): string {
        return option && option.name ? option.name : '';
    }

    filter(data, id: number) {
        return data.filter(rec => rec.id === id);
    }

    ngOnDestroy() {
        this._destroyed.next();
        this._destroyed.complete();
    }
    
    

    ngOnInit() {
        // mia form
        this.myForm = this.formBuilder.group({
            id: [],
            date: ['', [Validators.required]],
            _tmp_archives: [],
            dateProtocolIn: [],
            dateProtocol: [],
            year: [],
            strUid: [],
            strUidProtocolIn: [],
            type: ['', [Validators.required]],
            object: ['', [Validators.required]],
            idTypology: [],
            idArchive: [],
            idOrganizationTown: [],
            idTown: [],
            idDistrict: [],
            address: [],
            cap: [],
            businessName: [],
            number: [],
            converted: [],
            idOrganization: [],
            oldProvincia: [],
            oldNazione: [],
            oldCitta: [],
            istatComune: [],
            istatProvincia: []
        });

        Object.keys(this.myForm.controls)
            .forEach(field => {
                const control = this.myForm.get(field);
                control.markAsTouched({ onlySelf: true });
        });

        
        // mi scarico i faldoni
        this.peronService.getBy(8).pipe(map(resp => resp.data))
            .subscribe(data => {
                this.tmpListaFaldoni.next(data);
            });
        // mi scarico gli enti
        this.peronService.listByArea(7).pipe(map(resp => resp.data))
            .subscribe(data => {
                this.tmpListaEnti.next(data);
            });
        this.listFaldoni$ = this.tmpListaFaldoni.asObservable();
        this.listEnti$ = this.tmpListaEnti.asObservable();
        // scarico le provincie
        this.listProvincie$ = this.generalService.listProvincie().pipe(map(resp => resp.data));
        let newRecord = true;
        if (this.data.protocol) {
            newRecord = false;
            // setting della mia form
            combineLatest(this.tmpListaFaldoni, this.tmpListaEnti)
                .pipe(takeUntil(this._destroyed))
                .subscribe(([faldoni, enti]) => {
                    const rec = Object.assign({}, this.data.protocol);
                    const {
                        idArchive,
                        idOrganization
                    } = rec;
                    rec.idArchive = this.filter( faldoni, idArchive )[0];
                    rec.idOrganization = this.filter( enti, idOrganization )[0];
                    rec._tmp_archives = rec.idArchive;
                    // stoppo la propagazione dei change legati alla form
                    this.myForm.patchValue( rec, {emitEvent: false} );
                });

        }
        // change fladone -- risetto il numero faldone
        this.myForm.get('idArchive').valueChanges
            .pipe(takeUntil(this._destroyed))
            .subscribe(value => {
                this.myForm.patchValue({
                    _tmp_archives: value
                }, { emitEvent: false });
            });
        // change numero faldone -- risetto il faldone
        this.myForm.get('_tmp_archives').valueChanges
            .pipe(takeUntil(this._destroyed))
            .subscribe(value => {
                this.myForm.patchValue({
                    idArchive: value
                }, { emitEvent: false });
            });
        // change pronvincia -- carico i comuni
        this.listComuni$ = this.myForm.get('istatProvincia').valueChanges
            .pipe(
                takeUntil(this._destroyed),
                filter(data => data !== null),
                switchMap(data => this.generalService.listComuni(data).pipe(map(resp => resp.data)))
            );
    }
}
