import { 
    Component, 
    OnInit
} from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { VigileService } from '../../service';
import { switchMap, map } from 'rxjs/operators';
import { iif, of, empty } from 'rxjs';

interface NavLink {
    label: string,
    idMenu?: number,
    path: string,
    readOnly?: boolean
}

@Component({
    selector: 'app-edit-vigile',
    templateUrl: './edit-vigile.component.html',
    styleUrls: ['./edit-vigile.component.scss']
})
export class EditVigileComponent implements OnInit {

    navLinks: NavLink[] = [
        {
            label: 'Anagrafica',
            path: 'anagrafica',
            idMenu: 12
        },
        {
            label: 'Patenti di servizio',
            path: 'licenses',
            readOnly: true,
            idMenu: 9
        },
        {
            label: 'Certificazioni',
            path: 'certified',
            readOnly: true,
            idMenu: 10
        },
        {
            label: 'Movimenti di assenza',
            path: 'assenze',
            readOnly: true,
            idMenu: 13
        },
        {
            label: 'Mansioni',
            path: 'mansioni',
            readOnly: true,
            idMenu: 7,

        },
        {
            label: 'Servizio',
            path: 'servizi',
            readOnly: true,
            idMenu: 8
        }
    ];

    hideTabServizio: boolean = true;
    title: string = 'Nuovo vigile';

    constructor(
        private route: ActivatedRoute,
        private vigileService: VigileService
        ) { }
         
    ngOnInit() {

        
        this.route
            .params
            .pipe(
                switchMap(params => 
                    iif(() => (params['id'] && params['id'] > 0), this.vigileService.get(params['id']), empty()),                
                ),
                map(data => ({nome: data['data'].firstName, cognome: data['data'].lastName}))
            )
            .subscribe(params => {
                
                const {
                    nome,
                    cognome
                } = params

                this.title = nome + ' ' + cognome;
                this.hideTabServizio = false;
                
            })

    }

}
