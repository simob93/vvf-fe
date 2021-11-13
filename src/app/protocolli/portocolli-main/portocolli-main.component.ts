import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ProtocolliServiceService } from '../../service/protocolli-service.service';
import { max } from 'moment';
import { MatDialog, MatAutocompleteTrigger } from '@angular/material';
import { PortocolliEditComponent } from '../portocolli-edit/portocolli-edit.component';
import { StandardMessageComponent } from '../../common/standard-message/standard-message.component';
import { Protocol } from '../../model';
import { ProtocolloRicercaAvanzataComponent } from 'src/app/protocollo-ricerca-avanzata/protocollo-ricerca-avanzata.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
   selector: 'app-portocolli-main',
   templateUrl: './portocolli-main.component.html',
   styleUrls: ['./portocolli-main.component.scss']
})
export class PortocolliMainComponent implements OnInit {

   
   page: number = 1;
   firstResult:number = 0;
   maxResult: number = 50;
   total: number = 0;
   start: number = 0;

   objectSearch = {
      oggetto: '',
      tipologia: null,
      numeroProtocollo: '',
      dal: null,
      al: null,
      idFaldone: null,
      _tmp_faldone: null
   }
   private _onDestroy: Subject<any> = new Subject<any>();

   listProtocolli = [];
   displayedColumns = ['type', 'dateProtocol', 'strUid', 'descrFaldone', 'object', 'action']

   constructor(
      private protocolliService: ProtocolliServiceService,
      private dialog: MatDialog) { }

  

   /**
    *
    * @param protocol
    */
   showDialog(protocol?) {
      const dialogRef = this.dialog.open(PortocolliEditComponent, {
            data: {
               protocol
            }
        });
      dialogRef.afterClosed().subscribe(() => this.fetchData());
   }
   /**
    * 
    */
   onClickBtnRicercaAvanzata() {
      let dialogRef = this.dialog.open(ProtocolloRicercaAvanzataComponent, {
         width: '400px',
         data: this.objectSearch
      });
      dialogRef.afterClosed()
      .pipe(takeUntil(this._onDestroy))
      .subscribe((params) => {
         this.objectSearch = params;
         this.fetchData();
      })
   }
   /**
    *
    * @param protocollo
    */
   onClickBtnDeleteProt(protocollo: Protocol) {

      this.dialog.open(StandardMessageComponent, {
            data: {
                type: 'DEL',
                callbackOnOk: () => {
                    this.protocolliService.delete(protocollo['id']).subscribe(rec => {
                        this.fetchData();
                    });
                }
            }
        });

   }

   onClickBtnDetail(protocol) {
      this.showDialog(protocol);
   }

   onClickBtnFind() {
      this.fetchData();
   }

   onClickBtnAdd() {
      this.showDialog();
   }
   /**
    *
    * @param firstResult
    * @param maxResult
    */
   fetchData() {

      let params = {...this.objectSearch};
      delete params._tmp_faldone;

      this.protocolliService.listProtocolli(this.firstResult, this.maxResult, params).subscribe(result => {
         this.listProtocolli = result['data'];
         this.total = result['total'];
      });
   }

   goToPage(event) {
      this.firstResult = event.pageIndex * this.maxResult;
      this.fetchData();
  }


   ngOnInit() {
      this.fetchData();
   }

}
