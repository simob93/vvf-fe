import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { filter, map } from 'rxjs/operators';
import { sporcaForm, resetStateForm } from 'src/app/utils/functions';
import { StandardMessageComponent } from 'src/app/common/standard-message/standard-message.component';
import { MatDialog } from '@angular/material';
import { MagazzinoService } from 'src/app/service/magazzino.service';


@Component({
    selector: 'mag-depositi-form',
    templateUrl: './depositi-form.component.html',
    styleUrls: ['./depositi-form.component.scss']
})
export class DepositiFormComponent implements OnInit {
    myForm: FormGroup;
    @Output() afterSave: EventEmitter<any> = new EventEmitter<any>();
    @Output() afterDelete: EventEmitter<any> = new EventEmitter<any>();

    private idDeposito: number;

    constructor(
        private formBuilder: FormBuilder,
        private dialog: MatDialog,
        private warehouseService: MagazzinoService) { }

    onClickBtnNuovo() {
        this.myForm.reset();
        sporcaForm(this.myForm);
        
    }

    onClickBtnElimina() {
        const {
            id
        } = this.myForm.value

        this.dialog.open(StandardMessageComponent, {
            data: {
                type: 'DEL',
                callbackOnOk: () => {
                    this.warehouseService.deleteDeposito(id)
                        .pipe(
                            filter(resp => resp.success)
                        )
                        .subscribe(resp => {
                            this.afterDelete.emit(resp.data);
                        });
                }
            }
        });


    }

    onClickBtnRipristina() {
        if (this.idDeposito) {
            this.loadData(this.idDeposito);
        } else {
            this.myForm.reset();
        }
    }

    onClickBtnConferma() {
        let record = this.myForm.value;
        const {
            id
        } = record
        if (!id) {
            this.warehouseService.saveDepositi(record)
                .pipe(
                    filter(resp => resp.success)
                )
                .subscribe(resp => {
                    this.afterSave.emit(resp.data);
                });
        } else {
            this.warehouseService.updateDepositi(record)
                .pipe(
                    filter(resp => resp.success)
                )
                .subscribe(resp => {
                    this.afterSave.emit(resp.data);
                });
        }

    }
    /**
     * 
     * @param id 
     */
    loadData(id) {
        this.idDeposito = id;
        this.myForm.reset();
        //resetStateForm(this.myForm);
        
        if (!this.idDeposito) return;

        this.warehouseService.getDeposito(this.idDeposito)
            .pipe(
                filter(resp => resp.success),
                map(resp => resp.data)
            )
            .subscribe(data => {
                this.myForm.patchValue(data);
            })
    }

    ngOnInit() {
        this.myForm = this.formBuilder.group({
            id: [''],
            descrizione: ['', [Validators.required]],
            attivo: [false, []]
        })
    }

}
