import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../service/';

@Component({
    selector: 'app-impostazioni',
    templateUrl: './impostazioni.component.html',
    styleUrls: ['./impostazioni.component.scss']
})
export class ImpostazioniComponent implements OnInit {

    listAree = [];
 
    constructor(
        private generalService: GeneralService
    ) { }

    ngOnInit() {
        this.generalService.listAree().subscribe(data => {
            this.listAree = data['data'];
        });
    }
}
