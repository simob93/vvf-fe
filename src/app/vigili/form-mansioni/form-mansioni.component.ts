import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, AfterViewInit } from '@angular/core';
import { Carriera, Person, Assenza, Area } from 'src/app/model';
import { Observable, Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { PersonService, GeneralService } from 'src/app/service';
import { CarrieraService } from 'src/app/service/carriera.service';
import { StandardMessageComponent } from 'src/app/common/standard-message/standard-message.component';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { startOfDay, formattaData } from 'src/app/utils/functions';
import * as moment from 'moment';

@Component({
    selector: 'app-form-mansioni',
    templateUrl: './form-mansioni.component.html',
    styleUrls: ['./form-mansioni.component.scss']
})
export class FormMansioniComponent implements OnInit, OnDestroy, AfterViewInit {

    myForm: FormGroup;

    listType$: Observable<Area[]>;
    //listSubType$: Observable<Person[]>;
    _onDestroy: Subject<any> = new Subject();

    @Input() idVigile: number;
    private _record: Carriera;
    get record(): Carriera {
        return this._record;
    }
    @Input() set record(value: Carriera) {
        this._record = value || {} as Carriera;
        if (value) {
            this.myForm.reset();
            this.myForm.patchValue(value);
        }
    }
    @Output() afterOperation: EventEmitter<any> = new EventEmitter<any>();

    constructor(
        private dialog: MatDialog,
        private formBuilder: FormBuilder,
        private personService: PersonService,
        private generalService: GeneralService,
        private carrieraService: CarrieraService
    ) { }
    ngAfterViewInit(): void {

    }
    ngOnDestroy(): void {

        this._onDestroy.next();
        this._onDestroy.complete();
    }

    onClickBtnNuovo() {
        this.myForm.reset();
        this.myForm.markAsDirty();

        this.myForm.patchValue({
            dal: moment()
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
                    this.carrieraService.delete(id).subscribe(detail => {
                        this.afterOperation.emit();
                        this.myForm.reset();
                    })
                }
            }
        });

    }

    onClickBtnConferma() {
        let valueForm = Object.assign({}, this.myForm.value);
        const {
            id,
            dal,
            al
        } = valueForm;
        

        valueForm.dal = formattaData(startOfDay(dal));
        if (valueForm.al) {
            valueForm.al = formattaData(startOfDay(al));
        }

        Object.assign(valueForm, {
            idVigile: this.idVigile
        })

        if (!id)
            this.carrieraService.save(valueForm)
                .subscribe(data => {
                    this.loadData(data)
                    this.afterOperation.emit();
                });
        else
            this.carrieraService.update(valueForm)
                .subscribe(data => {
                    this.loadData(data)
                    this.afterOperation.emit();
                });
    }
    /**
     * 
     * @param data 
     */
    loadData(data: Carriera) {
        this.myForm.reset();
        this.myForm.patchValue(data);
    }

    ngOnInit() {

        this.listType$ = this.personService.listByArea(4).pipe(map(resp => resp['data']));

        //definizione capi form 
        this.myForm = this.formBuilder.group({
            id: [],
            idVigile: [],
            dal: ['', [Validators.required]],
            al: [''],
            tipo: ['', [Validators.required]],
            note: ['']
        });
    }

}
