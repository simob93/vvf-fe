import { Component, OnInit } from '@angular/core';
import {
    VigileService
} from '../../service/vigile.service';

import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import * as VigiliAction from '../../actions/vigiliAction';
import { AppFetchState } from '../../state';
import { Vigile } from '../../model';
import { Observable } from 'rxjs';
import { StandardMessageComponent } from '../../common/standard-message/standard-message.component';
import { MatDialog } from '@angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import { AuthService } from 'src/app/service/auth.service';
import { COD_VIDEATA_GEST_VIGILI, COD_VIDEATA_ANAGRAFICA } from 'src/app/utils/constant';



@Component({
    selector: 'app-list-vigili',
    templateUrl: './list-vigili.component.html',
    styleUrls: ['./list-vigili.component.scss'],
    providers: [VigileService]
})
export class ListVigiliComponent implements OnInit {

    searchForm: FormGroup;

    page: number = 1;
    limit: number = 15;
    total: number = 0;
    start: number = 0;
    srcText: string = "";
    listVigili: Observable<Vigile[]>;
    COD_VIDEATA_ANAGRAFICA: number = COD_VIDEATA_ANAGRAFICA;

    displayedColumns: string[] = ['firstName', 'birthday', 'email', 'address', 'phone', 'action'];
    constructor(
        private vigileService: VigileService,
        private dialog: MatDialog,
        private authService: AuthService,
        private formBuilder: FormBuilder
    ) { }
    /**
     *
     * @param vigile
     */
    onClickDeleteVigile(vigile: Vigile) {

        this.dialog.open(StandardMessageComponent, {
            data: {
                type: 'DEL',
                callbackOnOk: () => {
                    this.vigileService.delete(vigile.id).subscribe(detail => {
                        if (detail['success']) {
                            this.fetchVigili();
                        }
                    })
                }
            }
        });
    }

    ngOnInit() {
        this.searchForm = this.formBuilder.group({
            nominativo: []
        });
        this.searchForm.get('nominativo').valueChanges.
            pipe(debounceTime(300))
            .subscribe(data => this.fetchVigili());
        this.fetchVigili();        
    }

    fetchVigili() {

        this.srcText = this.searchForm.get('nominativo').value;
        this.vigileService.list(this.start, this.limit, this.srcText).subscribe(
            detail => {
                if (detail['success']) {
                    this.listVigili = detail['data'];
                    this.total = detail['total'];
                }
            });
    }

    onClickBtnPrint() {
        this.vigileService.print();
    }

    goToPage(event) {
        this.start = event.pageIndex * this.limit;
        this.fetchVigili();
    }

    search() {
        this.fetchVigili();
    }
}
