import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GeneralService, PersonService } from 'src/app/service';
import { Person, Assenza } from 'src/app/model';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AssenzeService } from 'src/app/service/assenzeService';
import { StandardMessageComponent } from 'src/app/common/standard-message/standard-message.component';
import { MatDialog } from '@angular/material';
import { startOfDay, sommaDataOra, formattaData } from 'src/app/utils/functions';
import * as moment from 'moment';

@Component({
    selector: 'app-form-assenze',
    templateUrl: './form-assenze.component.html',
    styleUrls: ['./form-assenze.component.scss']
})
export class FormAssenzeComponent implements OnInit {
    myForm: FormGroup;

    listMotivi$: Observable<Person[]>;

    @Input() idVigile: number;
    private _record: Assenza;
    get record(): Assenza {
        return this._record;
    }
    @Input() set record(value: Assenza) {
        this._record = value || {} as Assenza;
        if (value) {
            this.myForm.reset();
            this.loadData(value);
            //this.myForm.patchValue(value);
        }
    }
    @Output() afterOperation: EventEmitter<any> = new EventEmitter<any>();

    constructor(
        private dialog: MatDialog,
        private formBuilder: FormBuilder,
        private personService: PersonService,
        private assenzeService: AssenzeService
    ) { }

    onClickBtnNuovo() {
        this.myForm.reset();
        this.myForm.markAsDirty();
        this.myForm.patchValue({
            dal: moment(),
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
                    this.assenzeService.delete(id).subscribe(detail => {
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
            dalle,
            alle,
            al
        } = valueForm;

        valueForm.dal = formattaData(sommaDataOra(dal, dalle));
        if ( !!valueForm.al ) {
            valueForm.al = formattaData(sommaDataOra(al, alle));
        }

        Object.assign(valueForm, {
            idVigile: this.idVigile
        });

        if (!id)
            this.assenzeService.save(valueForm)
            .subscribe(data => {
                this.loadData(data) 
                this.afterOperation.emit();
            } );
        else 
            this.assenzeService.update(valueForm)
            .subscribe(data => {
                this.loadData(data)
                this.afterOperation.emit();
            });
    }
    /**
     * 
     * @param data 
     */
    loadData(data: Assenza) {
        this.myForm.reset();
        this.myForm.patchValue(data);
       
        
        this.myForm.patchValue({
            dalle: data.dal && moment.utc(data.dal).format('HH:mm'),
            alle: data.al && moment.utc(data.al).format('HH:mm'),
        });
    }

    ngOnInit() {

        this.listMotivi$ = this.personService.listByArea(9).pipe(map(resp => resp['data']) );

        //definizione capi form 
        this.myForm = this.formBuilder.group({
            id:         [],
            idVigile:   [],
            dalle:      ['', [Validators.required]],
            alle:       [''], 
            dal:        ['', [Validators.required]],
            al:         [''],
            motivo:     ['', [Validators.required]],
            note:       ['']
        });            
    }

}
