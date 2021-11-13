import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UtentiService } from '../service/utenti.service';
import { Subject, Observable } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { RuoliService } from '../service/ruoli.service';
import { UtenteRuolo } from '../model/utenti';
import { MatDialog } from '@angular/material';
import { StandardMessageComponent } from '../common/standard-message/standard-message.component';


@Component({
  selector: 'app-form-account',
  templateUrl: './form-account.component.html',
  styleUrls: ['./form-account.component.scss']
})
export class FormAccountComponent implements OnInit, OnDestroy {
  myForm: FormGroup;
  private _onDestory: Subject<any> = new Subject();
  listRuoli$: Observable<any>  = null;
  
  @Output('callback_salvaRecord') callback_salvaRecord: EventEmitter<any> = new EventEmitter<any>();

  private _idUtente: number;
  @Input('idUtente') 
  get idUtente(): number {
    return this._idUtente;
  }
  set idUtente(value: number) {
    this._idUtente = value;
    if (this._idUtente) {;
      this.caricaUtente();
    }
  }
  
  
  /**
   * 
   * @param builder 
   * @param utenteService 
   */
  constructor(
    private builder: FormBuilder,
    private dialog: MatDialog,
    private ruoliService: RuoliService,
    private utenteService: UtentiService) { }

  ngOnDestroy(): void {
    this._onDestory.next();
    this._onDestory.complete();
  }
  /**
   * 
   * @param record 
   */
  newUser(record) {
    
    this.utenteService.save(record)
    .pipe(
      takeUntil(this._onDestory)
    )
    .subscribe(resp => this.callback_salvaRecord.emit(resp))
  }
  /**
   * 
   * @param record 
   */
  updateUser(record) {
    this.utenteService.update(record)
    .pipe(
      takeUntil(this._onDestory)
    )
    .subscribe(resp => this.callback_salvaRecord.emit(resp))
  }

  onClickConferma() {

    let record = this.myForm.getRawValue();

    const {
      id,
      ruolo
    } = record;

    if (ruolo) {
      record.ruolo = [ruolo];
    }
  
    if (id) {
        this.updateUser(record);
    } else this.newUser(record);
  }

  onClickBtnResetPassword() {
    
    let record = this.myForm.getRawValue();

    const {
      id
    } = record;

    this.utenteService.resetPassword(id)
    .subscribe(resp => {
      this.callback_salvaRecord.emit(resp);
    }); 
    
  }

  onClickBtnRipristina() {
    

    if (this.idUtente) {
      this.caricaUtente();
    } else {
      this.myForm.reset();  
    }
  }

  onClickBtnNuovo() {
    this.myForm.reset();
  }

  onClickBtnElimina() {
  
    const {
      id
    } = this.myForm.getRawValue();

    this.dialog.open(StandardMessageComponent, {
      data: {
          type: 'DEL',
          callbackOnOk: () => {
              this.utenteService.delete(id)
              .subscribe(rec => {
                this.callback_salvaRecord.emit();
                this.myForm.reset();
              })
          }
      }
  });       
    
  }
  /**
   *  caricamento dei dati utente all'interno del form 
   */
  caricaUtente() {
    
    this.utenteService.get(this.idUtente)
    .pipe(
      takeUntil(this._onDestory)
    )
    .subscribe(record => {
        let ruoli = record.data.ruolo,
            ruolo : UtenteRuolo =  null;

        if (ruoli && ruoli.length > 0) {
          ruolo = ruoli[0];
        }
        let valueForm = record.data as any;
        valueForm.ruolo = ruolo;
        this.myForm.patchValue(valueForm || {});

    })
  }

  onClickBtnDisabilita() {

    const {
      id
    } = this.myForm.getRawValue();

    this.utenteService.disable(id)
    .subscribe(resp => {
      this.callback_salvaRecord.emit(resp);
    }); 
  }

  onClickBtnAbilita() {
    const {
      id
    } = this.myForm.getRawValue();

    this.utenteService.enable(id)
    .subscribe(resp => {
      this.callback_salvaRecord.emit(resp);
    }); 
  }

  get isValidId() {
    return (this.myForm.get('id') &&  this.myForm.get('id').value)
  }

  ngOnInit() {

    this.myForm = this.builder.group({
      id: ['', []],
      primoAcesso: ['', []],
      abilitato: ['', []],
      ruolo: this.builder.group({
        id: ['', []], //viene rielaborato 
        idUtente: ['', []],
        idRuolo: ['', []]
      }),
      username: ['', []],
      nome: ['', [Validators.required]],
      cognome: ['', [Validators.required]],
      email: ['', [Validators.required]]
    })
    this.listRuoli$ = this.ruoliService.listCbox().pipe(map(resp => resp.data));
  }

}
