import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MessageService } from '../service/message.service';
import { MessageState } from '../state/allState';


@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

    constructor(
        private messageService: MessageService,
        private snackBar: MatSnackBar,
        public dialog: MatDialog) { 

    }
    ngOnInit() {

        this.messageService.messageState.subscribe((msgState: MessageState) => { 
            if (msgState.success) {
                //tutte le chiamate di salvataggio record quelle di ricerca non devono mostrare il dialog
                this.snackBar.open(msgState.message, null, {
                    duration: 1500
                });
            } else if (msgState.showDialog) {
                this.dialog.open(DialogMessage, {
                    data: msgState.message
                })
            }
        });
    }

}

@Component({
    selector: 'dialog-message',
    template: `
        <h1 mat-dialog-title>Attenzione</h1>
        <div mat-dialog-content>
          <p>{{this.data}}</p>
        </div>
        <div mat-dialog-actions>
          <button mat-button [mat-dialog-close]="true">Ok</button>
        </div>
    `,
  })
  export class DialogMessage {
  
    constructor(
      public dialogRef: MatDialogRef<DialogMessage>,
      @Inject(MAT_DIALOG_DATA) public data: any) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }
