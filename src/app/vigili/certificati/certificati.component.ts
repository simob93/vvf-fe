import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonService, VigileService } from '../../service';
import { Store } from '@ngrx/store';
import * as VigileCertificatiAction from '../../actions/vigileCertificazioniAction';
import { AppState } from '../../reducers';
import { AppFetchState } from '../../state';
import { Subject } from 'rxjs';
import { VigileCertificatiService } from '../../service/vigile-certificati.service';
import { MatDialog } from '@angular/material';
import { StandardMessageComponent } from '../../common/standard-message/standard-message.component';
import { formattaData } from 'src/app/utils/functions';

@Component({
    selector: 'app-certificati',
    templateUrl: './certificati.component.html',
    styleUrls: ['./certificati.component.scss']
})
export class CertificatiComponent implements OnInit {


    listaPersonCertificati = [];
    certificati = [];
    idVigile: number;

    constructor(private activeRoute: ActivatedRoute, 
        private personService: PersonService, 
        private vigileService: VigileService,
        private dialog: MatDialog,
        private vigileCertificatiService: VigileCertificatiService) {
    }

    fetchData(id) {
        this.vigileService.listCertificati(id).subscribe(rec => {
            this.certificati = rec['data'];
        })
    }

    fetchCertificati(callBackFn) {
        return this.personService.listByArea(2)
            .subscribe(data => {
                this.listaPersonCertificati = data['data'];
                callBackFn(data)
            })
    }

    onClickConferma() {

        this.certificati.forEach(certificato => {
            certificato.date = formattaData(certificato.date);
            certificato.dateExpiration = formattaData(certificato.dateExpiration)
        }); 

        this.vigileCertificatiService.save(this.certificati).subscribe(data => {
            if (data['success']) {
                this.fetchData(this.idVigile);
            }

        });
    }

    onRemoveElement(record) {

        this.dialog.open(StandardMessageComponent, {
            data: {
                type: 'DEL',
                callbackOnOk: () => {
                    this.vigileCertificatiService.delete(record['id']).subscribe(rec=> {
                        if (rec['success'])
                            this.fetchData(this.idVigile);
                    });
                }
            }
        })
        
    }
 
    ngOnInit() {
        this.activeRoute
            .parent
            .params
            .subscribe(params => {
                this.idVigile = params['id'];
                this.fetchCertificati(() => {
                    if (params['id'] && params['id'] > 0)
                        this.fetchData(params['id'])
                })
            });
    }

}
