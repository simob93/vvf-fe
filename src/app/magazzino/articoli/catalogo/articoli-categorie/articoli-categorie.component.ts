import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { MagazzinoService } from 'src/app/service/magazzino.service';
import { BehaviorSubject, of, iif, Subject, Observable, forkJoin } from 'rxjs';
import { map, switchMap, tap, takeUntil, filter, share } from 'rxjs/operators';
import { ArticoloCategoria, JsonResponse } from 'src/app/model';
import { ArticoloSharedService } from 'src/app/service/articolo-shared.service';
import { GeneralService } from 'src/app/service';
import { MessageService } from 'src/app/service/message.service';

@Component({
    selector: 'mag-articoli-categorie',
    templateUrl: './articoli-categorie.component.html',
    styleUrls: ['./articoli-categorie.component.scss']
})
export class ArticoliCategorieComponent implements OnInit, OnDestroy {
    idArticolo: number;
    myForm: FormGroup;
    dirtyForm: boolean = false;
    array_cbox: FormArray = new FormArray([]);
    deleted_record: any[];
    categorie$ : Observable<any> = null;
    listCategorie$ : BehaviorSubject<any> = new BehaviorSubject<any>([]);
    riposteLoad: boolean = false;
    private _onDestroy: Subject<any> = new Subject<any>();
    listCategorie: any[] = [];
    count: number = null;

    constructor(
        private fb: FormBuilder,
        private message: MessageService,
        private articoloSharedService: ArticoloSharedService,
        private magazzinoService: MagazzinoService
    ) { }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
        //this.listCategorie.next([]);
        //this.listCategorie.complete();
    }

    /**
     * 
     * @param option 
     */
    displayFn(option) {
        return option && option.descrizione ? option.descrizione : '';
    }
    /**
     * 
     * @param index 
     */
    removeCategoria(index) {

        let artCat = (<FormArray>this.myForm.get('articoliCategorie')).controls[index];
        if (artCat != null && artCat.get('id').value) {
            artCat.patchValue({ eliminare: true })
            this.deleted_record.push(artCat.value);
        }
        this.array_cbox.removeAt(index);
        this.dirtyForm = true;
    }

    onClickBtnNuovo() {
        this.array_cbox.insert(0, this.fb.group({
            id: [],
            categoria: []
        }))
    }

    get isDirty(): boolean {

        if (this.dirtyForm) {
            return true;
        }

        let arrayForm = <FormArray>this.myForm.get('articoliCategorie');
        let isDirty = false;
        arrayForm.controls.forEach(control => {
            if (control.dirty) {
                isDirty = true;
            }
        });
        return isDirty;
    }

    verificaCampi() {

        let record = this.myForm.value;
        const {
            articoliCategorie
        } = record;

        let error = false;

        if (articoliCategorie && articoliCategorie.length > 0) {
            error = articoliCategorie.some(artCat => {
                if ((!artCat['categoria'])) {
                    return true;
                }
                return false;
            })
        }
        if (error) {
            this.message.show({ message: 'Categoria non avvalorata', showDialog: true, success: false })
        }
        return !error;
    }

    onClickBtnConferma() {

        let record = this.myForm.value;
        const {
            articoliCategorie
        } = record;

        if (!this.verificaCampi()) return;

        articoliCategorie.push(...this.deleted_record);
        if (articoliCategorie.length > 0) {
            let records = articoliCategorie.map((rec, idx) => {
                return {
                    id: rec['id'],
                    eliminare: rec['eliminare'] || false,
                    idArticolo: this.articoloSharedService.getArticolo(),
                    idCategoria: rec['categoria'] && rec['categoria']['id']
                }
            })

            this.magazzinoService.saveArticoloCategoria(records)
                .pipe(
                    switchMap(resp => this.loadArticoloCategorie(this.idArticolo))
                )
                .subscribe(data => {
                    this.caricaDatiForm(data);
                });
        }
    }

    loadCategorie() {
        return this.magazzinoService.listCategorie()
            .pipe(
                map(response => response.data)
            )
    }
    /**
     * 
     * @param record 
     */
    caricaDatiForm(data) {
        this.count = data.length;
        if (data && data.length > 0) {
            data.forEach(artCat => {
                this.array_cbox.insert(0, this.fb.group({
                    id: artCat.id,
                    idArticolo: this.idArticolo,
                    eliminare: false,
                    categoria: this.listCategorie.find(cat => cat.id == artCat.idCategoria)
                }))
            })
        }
        
    }
    /**
     * 
     * @param id 
     */
    loadArticoloCategorie(id) {

        this.idArticolo = id;

        return this.magazzinoService.getArticoliCategorieByArticolo(id)
            .pipe(
                tap(() => {
                    this.dirtyForm = false;
                    this.array_cbox.controls = [];
                    this.deleted_record = [];
                }),
                filter(resp => resp.success),
                map(resp => resp.data))
    }

    caricaDipendenze() : Observable<any> {
        if (this.riposteLoad) {
            return of({});
        } else {
            return forkJoin(this.loadCategorie()).
            pipe(
                map(([categorie]) => {
                    this.listCategorie = categorie;
                    this.listCategorie$.next(categorie);
                    this.riposteLoad = true;
                })
            )
        }
    }

    ngOnInit() {

        this.myForm = this.fb.group({
            articoliCategorie: this.array_cbox
        });
       
        this.categorie$ = this.listCategorie$.asObservable();
     
        this.articoloSharedService.articoloNext$
            .pipe(
                takeUntil(this._onDestroy),
                tap(() => {
                    this.dirtyForm = false;
                    this.array_cbox.controls = [];
                    this.deleted_record = [];
                }),
                filter(id => id != null),
                switchMap(id => this.caricaDipendenze().pipe(map(() => id))),
                switchMap(id => this.loadArticoloCategorie(id)),
            ).subscribe(data => {
                this.caricaDatiForm(data);
            })

    }
}
