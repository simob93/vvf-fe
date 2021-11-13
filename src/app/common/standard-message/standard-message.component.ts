import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { BtnMessageType } from 'src/app/utils/constant';

@Component({
    selector: 'app-standard-message',
    templateUrl: './standard-message.component.html',
    styleUrls: ['./standard-message.component.scss']
})
export class StandardMessageComponent implements OnInit {

    message: string = "";
    btn: BtnMessageType[] = ["OK", "CANCEL"];
    constructor(
        @Inject(MAT_DIALOG_DATA) private data,
        private dialogRef: MatDialogRef<StandardMessageComponent>
    ) { 

        if (data['type'] == 'DEL') {
            this.message = 'Eliminare il dato selezionato?'
        }

        if (data['message']) {
            this.message = data['message'];
        }

        if (data['btns']) {
            this.btn = data['btns'];
        }

    }

    onClickBtnAnnulla() {
        this.dialogRef.close();
    }

    onClickBtnOk() {

        let fn = this.data['callbackOnOk'];
        if (fn) {
            fn();
        }
        this.dialogRef.close();

    }

    ngOnInit() {
    }

}
