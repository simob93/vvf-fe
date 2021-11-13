import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Scadenze } from '../../model';
import { MatDialog } from '@angular/material';
import { VigileService } from '../../service';
import { ActivatedRoute } from '@angular/router';
import { FormScadenzeComponent } from '../form-scadenze/form-scadenze.component';

@Component({
    selector: 'app-main-list',
    templateUrl: './main-list.component.html',
    styleUrls: ['./main-list.component.scss']
})
export class MainListComponent implements OnInit {

    @Input() listScadenze: Array<Scadenze> = [];
    @Input() actionColumn: boolean = true;
    @Output() onClickEditScadenza: EventEmitter<any> = new EventEmitter<any>(); 
    @Output() onClickRenewScadenza: EventEmitter<any> = new EventEmitter<any>(); 
    @Output() onClickDeleteScadenza: EventEmitter<any> = new EventEmitter<any>(); 


    displayedColumns: string[] = ['stato', 'tipo', 'descrFormatted', 'dateFrom', 'dateExpiration', 'action'];
    constructor() {
    }

    getDisplayedColumn() {
        return this.displayedColumns.filter(rec => {
            if (rec.includes('action') && !this.actionColumn) {
                return false;
            } else {
                return true;
            }
        });
    }

    onClickDelete(scadeza) {
        this.onClickDeleteScadenza.emit(scadeza);
    }

    onClickEdit(scadeza) {
        this.onClickEditScadenza.emit(scadeza);
    }

    onClickRenew(scadeza) {
        this.onClickRenewScadenza.emit(scadeza);
    }

    ngOnInit() {
     
    }

}
