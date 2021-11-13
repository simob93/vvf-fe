import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { PersonService } from '../../service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-impostazioni-form',
    templateUrl: './impostazioni-form.component.html',
    styleUrls: ['./impostazioni-form.component.scss']
})
export class ImpostazioniFormComponent implements OnInit {
    myForm: FormGroup; 
    showExtraField = [8];
    constructor(
        private formBuilder: FormBuilder,
        private personService: PersonService,
        @Inject(MAT_DIALOG_DATA) public data
    ) {}
    onClickConferma() {


        const {
            callBackAfterConfirm =  () => null
        } = this.data;

        const person = this.myForm.value;

        if (person['id']) {
            this.personService.update(person).subscribe(data => {
                if (data['success']) {
                    callBackAfterConfirm();
                }
            })
        } else {
            this.personService.save(person).subscribe(data => {
                if (data['success']) {
                    callBackAfterConfirm();
                }
            })
        }

    }

    getShowExtraField() {
        return this.showExtraField.includes(this.myForm.get('idArea').value);
    }

    showCbScadenza() {
        return this.data.enableGestExpiry;
    }

    ngOnInit() {
        this.myForm = this.formBuilder.group({
            id:            [],
            idArea:        [],
            name:          [],
            extra:         [],
            enabledExpiry: [],
            scadenza:  this.formBuilder.group({
                id:              [],
                idPerson:        [],
                expirationEvery: [],
                expirationType:  []

            })
        });

        if (this.data) {
            const {
                record
            } = this.data;
            const objectForm = record || {};
            if (!objectForm.scadenza) {
                delete objectForm.scadenza;
            } 
            this.myForm.patchValue(objectForm);
        }
    }
}
