import { Component, EventEmitter, Inject, OnInit, Optional, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import * as moment from 'moment';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { StandardMessageComponent } from 'src/app/common/standard-message/standard-message.component';
import { Grado, Person } from 'src/app/model';
import { PersonService } from 'src/app/service';
import { GradoService } from 'src/app/service/grado.service';
import { formattaData, sommaDataOra } from '../../utils/functions';

@Component({
    selector: 'app-form-grado',
    templateUrl: './form-grado.component.html',
    styleUrls: ['./form-grado.component.scss']
})
export class FormGradoComponent implements OnInit {

    myForm: FormGroup;

    listType$: Observable<Person[]>;
    _onDestroy: Subject<any> = new Subject();

    @Output() afterOperation: EventEmitter<any> = new EventEmitter<any>();

    constructor(
        private dialog: MatDialog,
        @Optional() @Inject(MAT_DIALOG_DATA) private data,
        private formBuilder: FormBuilder,
        private personService: PersonService,
        private gradoService: GradoService
    ) {

      

     }
    ngAfterViewInit(): void {
      
    }
    ngOnDestroy(): void {

        this._onDestroy.next();
        this._onDestroy.complete();
    }

    onClickBtnEsci() {
        this.dialog.closeAll();
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
                    this.gradoService.delete(id).subscribe(detail => {
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
            al,
            dalle,
            alle
        } = valueForm;
      
        valueForm.dal = formattaData(sommaDataOra(dal, dalle));

        if (valueForm.al) {
            valueForm.al = formattaData(sommaDataOra(al, alle));
        }
                
        if (!id) {
            this.gradoService.save(valueForm)
                .subscribe(data => {
                    if (data['success']) {
                        this.dialog.closeAll(); 
                    }
                });
        } else {
            this.gradoService.update(valueForm)
                .subscribe(data => {
                    if (data['success']) {
                    this.dialog.closeAll();
                    }
                });
        }
    }
    /**
     * 
     * @param data 
     */
    loadData(data: Grado) {

        this.myForm.reset();
        this.myForm.patchValue(data);

        this.myForm.patchValue({
            dalle: data.dal && moment.utc(data.dal).format('HH:mm'),
            alle: data.al && moment.utc(data.al).format('HH:mm'),
        });
    }

    ngOnInit() {

        this.listType$ = this.personService.listByArea(3).pipe(map(resp => resp['data']));

        //definizione capi form 
        this.myForm = this.formBuilder.group({
            id:            [],
            idServizio:    [],
            dal:           ['', [Validators.required]],
            al:            [''],
            alle:          [''],
            dalle:         ['', [Validators.required]],
            grado:         ['', [Validators.required]],
            note:          ['']
        });

        this.loadData(this.data['grado']);
    }

}
