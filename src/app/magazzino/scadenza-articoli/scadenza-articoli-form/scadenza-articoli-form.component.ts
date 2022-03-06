import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { KeyValue } from 'src/app/model/keyValue';
import { MagazzinoService } from 'src/app/service/magazzino.service';

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
    private fb : FormBuilder,
    private magazzinoService: MagazzinoService) { }

  onClickConferma() {

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
      articoloId: [null, [Validators.required]],
      tipoScadenza: [null, [Validators.required]],
      dataScadenza: [null, [Validators.required]],
      _categoria: [null, [Validators.nullValidator]],
      articolo: [null, [Validators.required]],
      note: [null, [Validators.required]]
    })
  
  }

}
