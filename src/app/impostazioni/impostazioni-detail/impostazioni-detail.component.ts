import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ImpostazioniFormComponent } from '../impostazioni-form/impostazioni-form.component';
import { Person } from '../../model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-impostazioni-detail',
    templateUrl: './impostazioni-detail.component.html',
    styleUrls: ['./impostazioni-detail.component.scss']
})
export class ImpostazioniDetailComponent implements OnInit {

    listRisposte$ :Observable<any> = null;
    idArea: number;
    enableGestExpiry: number = 0;

    constructor(
        private personService: PersonService,
        private dialog: MatDialog,
        private router: ActivatedRoute
    ) { }
    /**
     * 
     * @param person 
     */
    openDialog(person?: Person) { 

        if (!person) {
            person = new Person();
            person['idArea'] = this.idArea;
        }

        this.dialog.open(ImpostazioniFormComponent, {
            data: {
                record: person,
                enableGestExpiry: this.enableGestExpiry,
                callBackAfterConfirm: () => {
                    this.fetchData();
                    this.dialog.closeAll()
                }
            }
        });
    }
    /**
     * 
     * @param person 
     */
    onClickBtnDelete(person: Person) {
        this.personService.delete(person.id).subscribe(data => {
            if (data['success'])
                this.fetchData();
        })
    }

    onClickAddVoce() {
        this.openDialog();
    }

    getDisplayedColumns() {
        if (this.enableGestExpiry) {
            return ['name',  'expirationEvery', 'expirationType','action']
        } else {
            return ['name', 'action']
        }
    }
    /**
     * 
     * @param person 
     */
    onClickBtnDetail(person: Person) {
        this.openDialog(person)
    }

    fetchData() {
        this.listRisposte$ = this.personService
        .listByArea(this.idArea).pipe(map(resp => resp.data));
    }

    ngOnInit() {
        this.router.params.subscribe(
            params => { 
                this.idArea = parseInt(params['area']);
                this.fetchData()
        })
        this.router.queryParams.subscribe(
            params => { 
                this.enableGestExpiry = params['manage_expiry'] || 0;
                
        })
    }

}
