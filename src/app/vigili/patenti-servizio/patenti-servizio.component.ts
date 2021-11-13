import { Component, OnInit } from '@angular/core';
import { PatentiServizio } from '../../model/patentiServizio';
import { ActivatedRoute } from '@angular/router';
import { PersonService, VigileService } from '../../service';
import { Person } from '../../model';
import { VigilePatentiService } from '../../service/vigile-patenti.service';
import { MatDialog } from '@angular/material';
import { StandardMessageComponent } from '../../common/standard-message/standard-message.component';
import { formattaData } from 'src/app/utils/functions';

@Component({
    selector: 'app-patenti-servizio',
    templateUrl: './patenti-servizio.component.html',
    styleUrls: ['./patenti-servizio.component.scss']
})
export class PatentiServizioComponent implements OnInit {

    idVigile: number = null;
    patentiStandard: Array<PatentiServizio> = new Array<PatentiServizio>();
    patentiServizio: Array<Person>;
    constructor(
        private personService: PersonService,
        private dialog: MatDialog,
        private activeRoute: ActivatedRoute,
        private vigilePatentiService: VigilePatentiService,
        private vigileService: VigileService
    ) { }
    /**
     * 
     */
    fetchData() { 
        this.vigileService.listPatenti(this.idVigile).subscribe(data => {
            this.patentiStandard = data['data'];
        })
    }
    /**
     * 
     * @param callBackFn 
     */
    fetchPatentiServizio(callBackFn) {
        return this.personService.listByArea(5)
            .subscribe(data => {
                this.patentiServizio = data['data'];
                callBackFn(data)
            })
    }
    /**
     * 
     */
    onClickConferma() {

        this.patentiStandard.forEach(patente => {
            patente.date = formattaData(patente.date)
            patente.dateExpiration = formattaData(patente.dateExpiration)
        })

        this.vigilePatentiService.save(this.patentiStandard).subscribe(data => {
            if (data['success']) {
                this.fetchData();
            }         
        });
    }
    /**
     * 
     * @param record 
     */
    onRemovePatente(record) {

        this.dialog.open(StandardMessageComponent, {
            data: {
                type: 'DEL',
                callbackOnOk: () => {
                    this.vigilePatentiService.delete(record['id']).subscribe(rec=> {
                        if (rec['success'])
                            this.fetchData();
                    });
                }
            }
        })
    }
    /**
     * 
     */
    ngOnInit() {

        this.activeRoute
            .parent
            .params
            .subscribe(params => { 
                this.idVigile = params['id'];
                this.fetchPatentiServizio(() => {
                    if (params['id'] && params['id'] > 0)
                        this.fetchData()
                })            
            });
    }

}
