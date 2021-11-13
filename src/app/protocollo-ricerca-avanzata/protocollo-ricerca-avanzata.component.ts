import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { KeyValue } from '../model/keyValue';
import { PersonService } from '../service';
import { map, takeUntil, startWith } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { formattaData } from '../utils/functions';
import { DATE_FORMAT_STANDARD } from '../utils/constant';

@Component({
  selector: 'app-protocollo-ricerca-avanzata',
  templateUrl: './protocollo-ricerca-avanzata.component.html',
  styleUrls: ['./protocollo-ricerca-avanzata.component.scss']
})
export class ProtocolloRicercaAvanzataComponent implements OnInit {
  myForm: FormGroup;
  private _onDestroy: Subject<any> = new Subject<any>();
  listFaldoni$: Observable<any> = null;
  listTipologie$: Observable<KeyValue[]> = of([
    {
      codice: null,
      valore: 'E',
      extra: 'Entrata'
    },
    {
      codice: null,
      valore: 'U',
      extra: 'Uscita'
    }
  ])

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<ProtocolloRicercaAvanzataComponent>,
    private personService: PersonService
  ) { }

  displayFn(option) {
    return option && option.name ? option.name : '';
  }  

  onClickBtnConferma() {
    let {
      oggetto,
      faldone,
      dal,
      al,
      tipologia,
      numeroProtocollo,
    } = this.myForm.value;

    if (dal) {
        dal = formattaData(dal, DATE_FORMAT_STANDARD);
    }
    if (al) {
      al = formattaData(al, DATE_FORMAT_STANDARD);
    }

    this.dialogRef.close({oggetto, dal, al, tipologia, numeroProtocollo, idFaldone: faldone && faldone.id, _tmp_faldone: faldone});
  }

  onClickBtnRipristina() {
    this.myForm.reset();
  }
  

  ngOnInit() {

    this.listFaldoni$ = this.personService
    .getBy(8)
    .pipe(map(resp => {
        return resp.data.map(faldone => {
            let obj = faldone as any;
            obj.custom = obj.extra + ' - ' + obj.name
            return obj;
        })
    } ));

    this.myForm = this.fb.group({
      oggetto: ['', []],
      faldone: ['', []],
      dal: ['', []],
      al: ['', []],
      tipologia: ['', []],
      numeroProtocollo: ['', []]
    })

    if (this.data) {
      this.data.faldone = this.data._tmp_faldone;
      this.myForm.patchValue(this.data)
    }


    
  }
}
