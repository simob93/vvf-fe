import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { MagazzinoService } from 'src/app/service/magazzino.service';
import { ArticoloSharedService } from 'src/app/service/articolo-shared.service';
import { switchMap, map, tap, takeUntil } from 'rxjs/operators';
import { isValidID } from 'src/app/utils/functions';
import { of, forkJoin, Subject, BehaviorSubject } from 'rxjs';
import { Deposito, ArticoloDeposito } from 'src/app/model';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MessageService } from 'src/app/service/message.service';

@Component({
  selector: 'mag-articoli-depositi',
  templateUrl: './articoli-depositi.component.html',
  styleUrls: ['./articoli-depositi.component.scss']
})
export class ArticoliDepositiComponent implements OnInit, OnDestroy {
  idArticolo: number;
  listDepositi: Deposito[];
  depositi$: BehaviorSubject<Deposito[]> = new BehaviorSubject<Deposito[]>(null);
  myForm: FormGroup;
  dirtyForm: boolean = false;
  deleted_record: ArticoloDeposito[] = [];
  array_depositi: FormArray = new FormArray([]);
  private _destory: Subject<any> = new Subject<any>();

  count: number = null;

  constructor(private magazzinoService: MagazzinoService,
    private message: MessageService,
    private articoloSharedService: ArticoloSharedService,
    private fb: FormBuilder) { }

  ngOnDestroy(): void {
    this._destory.next();
    this._destory.complete();
  }

  get isDirty() {
    if (this.dirtyForm) {
      return true;
    }

    let arrayForm = <FormArray>this.myForm.get('articoliDepositi');
    let isDirty = false;
    arrayForm.controls.forEach(control => {
      if (control.dirty) {
        isDirty = true;
      }
    });
    return isDirty;
  }

  /**
     * 
     * @param index 
     */
  removeDeposito(index) {

    let artDep = (<FormArray>this.myForm.get('articoliDepositi')).controls[index];
    if (artDep != null && artDep.get('id').value) {
      artDep.patchValue({ eliminare: true })
      this.deleted_record.push(artDep.value);
    }
    this.array_depositi.removeAt(index);
    this.dirtyForm = true;
  }

  onClickBtnNuovo() {
    this.array_depositi.insert(0, this.fb.group({
      id: [],
      eliminare: [false],
      deposito: []
    }))
  }
  /**
   * 
   * @param idArticolo 
   */
  fetchDepositiArticolo(idArticolo) {

    if (!isValidID(idArticolo)) {
      return of({});
    }
    this.idArticolo = idArticolo;
    return this.magazzinoService.getArticoliDepositi(idArticolo).pipe(
      map(resp => resp.data)
    );
  }
  /**
   * carica i depositi attivi
   */
  fetchDepositi() {
    return this.magazzinoService.listDepositi().pipe(
      tap(resp => {
        this.listDepositi = resp.data || []; // salvo i depositi 
        this.depositi$.next(this.listDepositi);
      }),
      map(resp => resp.data)
    );
  }
  /**
   * 
   */
  caricaDipendenze() {
    return forkJoin(this.fetchDepositi())
  }

  onClickBtnConferma() {
    let record = this.myForm.value;
    const {
      articoliDepositi
    } = record;

    if (!this.verificaCampi()) return;

    articoliDepositi.push(...this.deleted_record);
    if (articoliDepositi.length > 0) {
      let records = articoliDepositi.map((rec, idx) => {
        return {
          id: rec['id'],
          eliminare: rec['eliminare'] || false,
          idArticolo: this.idArticolo,
          idDeposito: rec['deposito'] && rec['deposito']['id']
        }
      })

      this.magazzinoService.saveArticoloDeposito(records)
        .pipe(
          switchMap(resp => this.fetchDepositiArticolo(this.idArticolo))
        )
        .subscribe(data => {
          this.caricaDatiForm(data);
        });
    }
  }

  verificaCampi() {

    let record = this.myForm.value;
    const {
      articoliDepositi
    } = record;

    let error = false;

    if (articoliDepositi && articoliDepositi.length > 0) {
      error = articoliDepositi.some(artDep => {
        if ((!artDep['deposito'])) {
          return true;
        }
        return false;
      })
    }
    if (error) {
      this.message.show({ message: 'Deposito non avvalorata', showDialog: true, success: false })
    }
    return !error;
  }


  /**
   * 
   * @param articoloDepositi 
   */
  caricaDatiForm(articoloDepositi) {

    this.myForm.reset();
    this.dirtyForm = false;
    this.array_depositi.controls = [];
    this.deleted_record = [];
    this.count = articoloDepositi.length;
  
    if (articoloDepositi.length > 0) {
      articoloDepositi.forEach((artDep: ArticoloDeposito) => {
        this.array_depositi.insert(0, this.fb.group({
          id: artDep.id,
          idArticolo: artDep.idArticolo,
          eliminare: false,
          deposito: this.listDepositi.find(dep => dep.id == artDep.idDeposito)
        }))
      });
    }
  }
  /**
    * 
    * @param option 
    */
  displayFn(option) {
    return option && option.descrizione ? option.descrizione : '';
  }

  ngOnInit() {

    this.myForm = this.fb.group({
      articoliDepositi: this.array_depositi
    });

    this.articoloSharedService.articoloNext$
      .pipe(
        takeUntil(this._destory),
        switchMap(idArticolo => {
          return this.caricaDipendenze().pipe(
            switchMap(() => {
              return this.fetchDepositiArticolo(idArticolo)
            })
          )
        })
      ).subscribe(articoloDepositi => {
        this.caricaDatiForm(articoloDepositi);

      });



  }

}
