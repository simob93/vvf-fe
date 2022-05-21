import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StandardMessageComponent } from 'src/app/common/standard-message/standard-message.component';
import { MagazzinoService } from 'src/app/service/magazzino.service';
import { sporcaForm, isValidID } from 'src/app/utils/functions';
import { MatDialog } from '@angular/material';
import { filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { ArticoloSharedService } from 'src/app/service/articolo-shared.service';
import { Subject, of, iif } from 'rxjs';
import { JsonResponse, Articolo } from 'src/app/model';

@Component({
    selector: 'mag-articoli-form',
    templateUrl: './articoli-form.component.html',
    styleUrls: ['./articoli-form.component.scss']
})
export class ArticoliFormComponent implements OnInit, OnDestroy {

    myForm: FormGroup;
    idArticolo: number;
    private _onDestroy: Subject<any> = new Subject<any>();
    @Output() afterSave: EventEmitter<any> = new EventEmitter<any>();
    @Output() afterDelete: EventEmitter<any> = new EventEmitter<any>();

    constructor(
        private formBuilder: FormBuilder,
        private dialog: MatDialog,
        private articoloSharedService: ArticoloSharedService,
        private warehouseService: MagazzinoService) { }
    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    isValidID(id) {
        return isValidID(id);
    }

    onClickBtnNuovo() {
        this.myForm.reset();
        //sporcaForm(this.myForm);

    }

    onClickBtnElimina() {
        const {
            id
        } = this.myForm.value

        this.dialog.open(StandardMessageComponent, {
            data: {
                type: 'DEL',
                callbackOnOk: () => {
                    this.warehouseService.deleteArticolo(id)
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
        if (this.idArticolo) {
            this.articoloSharedService.nextArticolo(this.idArticolo);
        } else {
            this.myForm.reset();
        }
    }

    onClickBtnConferma() {
        let record = this.myForm.value;
        const {
            id
        } = record
        if (!isValidID(id)) {
            this.warehouseService.saveArticolo(record)
                .pipe(
                    filter(resp => resp.success)
                )
                .subscribe(resp => {
                    this.afterSave.emit(resp.data);
                });
        } else {
            this.warehouseService.updateArticolo(record)
                .pipe(
                    filter(resp => resp.success)
                )
                .subscribe(resp => {
                    this.afterSave.emit({id});
                });
        }

    }

    ngOnInit() {
        this.myForm = this.formBuilder.group({
            id: [''],
            codice: ['', []],
            abilitaScadenza: [false, []],
            abilitaTaglia: [false, []],
            descrizione: ['', [Validators.required]]
        })

        this.articoloSharedService.articoloNext$
            .pipe(
                takeUntil(this._onDestroy),
                switchMap(id => iif(() => id != null, this.warehouseService.getArticolo(id), of({} as JsonResponse<Articolo>)))
            )
            .subscribe(resp => {
                this.myForm.reset();
                if (resp && resp.success) {
                    this.idArticolo = resp.data.id;
                    this.myForm.patchValue(resp.data);
                }
            })

    }


}
