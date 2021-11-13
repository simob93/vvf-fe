import { Component, OnInit, Inject } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { KeyValue } from '../model/keyValue';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { RuoliService } from '../service/ruoli.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-edit-permesso',
  templateUrl: './edit-permesso.component.html',
  styleUrls: ['./edit-permesso.component.scss']
})
export class EditPermessoComponent implements OnInit {
  myForm: FormGroup;
  private _onDestroy: Subject<any> = new Subject<any>();
  permessiCbox$: Observable<KeyValue[]> = of([
    {
      codice: 1,
      valore: 'S',
      extra: 'Lettura/Scrittura'
    },
    {
      codice: 2,
      valore: 'N',
      extra: 'Nessun permesso'
    }
  ]);

  constructor(
    private fb: FormBuilder, 
    private dialogRef: MatDialogRef<EditPermessoComponent>,
    @Inject(MAT_DIALOG_DATA) public data : KeyValue,
    private ruoliService: RuoliService) { }

  onClickBtnEsci() {

  }

  onClickBtnConferma() {

    const {
      permesso,
      id
    } = this.myForm.value;

    this.ruoliService.changePermesso(id, permesso)
    .pipe(
      filter(data => data.success)
    )
    .subscribe(data => {
        this.dialogRef.close();
    });
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      id:       ['', [Validators.required]],
      voceMenu: ['', [Validators.required]],
      permesso: ['', [Validators.required]]
    })

    const {
      codice: id,
      valore: voceMenu,
      extra: permesso
    } = this.data;

    this.myForm.patchValue({ id, voceMenu, permesso })
    this.myForm.get('voceMenu').disable();
  }

}
