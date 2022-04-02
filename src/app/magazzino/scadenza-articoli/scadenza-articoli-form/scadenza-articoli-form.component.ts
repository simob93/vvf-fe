import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, throwToolbarMixedModesError } from '@angular/material';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ArticoliScadenza } from 'src/app/model/articoliScadenza';
import { ArticoliScadenzaList } from 'src/app/model/articoliScadenzaList';
import { ArticoliScadenzaRinnovo } from 'src/app/model/articoliScadenzaRinnovo';
import { KeyValue } from 'src/app/model/keyValue';
import { MagazzinoService } from 'src/app/service/magazzino.service';
import { formattaData } from 'src/app/utils/functions';

@Component({
  selector: 'app-scadenza-articoli-form',
  templateUrl: './scadenza-articoli-form.component.html',
  styleUrls: ['./scadenza-articoli-form.component.scss']
})
export class ScadenzaArticoliFormComponent implements OnInit {

  myForm: FormGroup;
  articoli$: Observable<any> = null;
  titolo: string = 'INSERIMENTO_SCADENZA';

  tipologieScadenza: KeyValue[] = [
    {
      codice: 1,
      valore: 'TIPO_SCADENZA_ARTICOLO_CONTROLLO'
    },
    {
      codice: 2,
      valore: 'TIPO_SCADENZA_ARTICOLO_FINE_VITA'
    }
  ]

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: any,
    public dialogRef: MatDialogRef<ScadenzaArticoliFormComponent>,
    private magazzinoService: MagazzinoService) {

    if (this.data) {
      if (this.data.titolo) {
        this.titolo = this.data.titolo;
      }
    }

  }

  get isRinnovo() : boolean {
    return this.data && this.data.rinnova
  }

  onClickConferma() {

    let recordForm = this.myForm.getRawValue();
    let object = {} as ArticoliScadenza;
    object.articoloId = recordForm['articolo']['id'];
    object.dataScadenza = formattaData(recordForm['dataScadenza']);
    object.tipoScadenza = recordForm['tipoScadenza'];
    object.note = recordForm['note'];


    if (this.isRinnovo) {
      let objRinnovo = {
        dataScadenza: object.dataScadenza, 
        note: object.note, 
        tipoScadenza: object.tipoScadenza
      } as ArticoliScadenzaRinnovo;
      this.magazzinoService.rinnovaScadenzaArticolo(recordForm['scadenzaId'], objRinnovo)
        .subscribe(() => this.dialogRef.close())
    } else {
      this.magazzinoService.saveScadenzaArticolo(object)
        .subscribe(() => this.dialogRef.close())
    }
  }

  /**
   * 
   * @param object 
   */
  displayArticolo(object) {
    return object ? object['descrizione'] : null
  }

  ngOnInit() {

    this.articoli$ = this.magazzinoService.listArticoli(null, null, null, true).pipe(map(risposta => risposta.data))

    this.myForm = this.fb.group({
      scadenzaId: [null, []],
      tipoScadenza: [null, [Validators.required]],
      dataScadenza: [null, [Validators.required]],
      articolo: [null, [Validators.required]],
      note: [null, [Validators.nullValidator]]
    })

    if (this.data) {
      if (this.isRinnovo) {
        let articolo = this.myForm.get('articolo');
        this.myForm.patchValue({
          scadenzaId: this.data.scadenza.scadenzaId,
          articolo: {
            descrizione: this.data.scadenza.descrArticolo,
            id: this.data.scadenza.articoloId
          }
        })
        articolo.disable();

      }
    }

  }

}

