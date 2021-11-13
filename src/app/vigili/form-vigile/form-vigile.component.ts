import {
    Component,
    OnInit,
    OnDestroy
} from '@angular/core';
import {
    Vigile,
    Person,
    City,
    Town
} from '../../model';
import {
    VigileService,
    PersonService,
} from '../../service/index';
import { Store } from '@ngrx/store';
import {
    ActivatedRoute,
    Router } from '@angular/router';

import * as VigiliDetailAction from '../../actions/vigiliDetailAction'

import { AppState } from '../../reducers';
import { AppFetchState } from '../../state';
import { Subject,  Observable } from 'rxjs';
import { GeneralService } from '../../service/general.service';
import {filter, map, switchMap, takeUntil} from 'rxjs/operators';
import {FormBuilder, FormGroup, FormArray, FormControl} from '@angular/forms';
import { formattaData } from 'src/app/utils/functions';

@Component({
    selector: 'app-form-vigile',
    templateUrl: './form-vigile.component.html',
    styleUrls: ['./form-vigile.component.scss'],
    providers: [VigileService, PersonService]
})
export class FormVigileComponent implements OnInit, OnDestroy {

    vigile: Vigile = new Vigile();
    patenti$: Observable<Person[]>;
    state: AppFetchState;
    listCity$: Observable<Array<City>>;
    listTown$: Observable<Array<Town>>;
    myForm: FormGroup;
    appoColor: string;
    emails: FormArray = new FormArray([]);
    phones: FormArray = new FormArray([]);
    private _destroyed: Subject<any> = new Subject<any>();

    messageEvent:Subject<any> = new Subject();

    constructor(
        private store: Store<AppState>,
        private formBuilder: FormBuilder,
        private activeRoute: ActivatedRoute,
        private router: Router,
        private personService: PersonService,
        private generalService: GeneralService,
        private vigileService: VigileService) {

        this.myForm = this.formBuilder.group({
            id:                   [],
            firstName:            [],
            lastName:             [],
            phone:                [],
            birthday:             [],
            listDrivingLicenses:  [],
            noSaltoTurno:         [],
            mail:                 [],
            cf:                   [],
            address:              [],
            istatProvincia:       [],
            istatComune:          [],
            postalCode:           [],
            codPhone:             [],
            extra_mail:           this.emails,
            extra_phone:          this.phones
        })

        this.store.select(state => state.detailVigiliReducer)
            .pipe(takeUntil(this._destroyed))
            .subscribe(result => {
                this.state = result;
                this.emails = new FormArray([]);
                this.phones = new FormArray([]);
                if (result.data) {
                    const {
                        extra_mail,
                        extra_phone
                    } = result.data;
                    if (extra_mail && extra_mail.length > 0) {
                        for (let i = 0; i< extra_mail.length; i++) {
                            this.emails.insert(0, new FormControl(extra_mail[i]));
                        }
                    }
                    if (extra_phone && extra_phone.length > 0) {
                        for (let i = 0; i< extra_phone.length; i++) {
                            this.phones.insert(0, new FormControl(extra_phone[i]));
                        }
                    }
                   this.myForm.patchValue(result.data);
                }
            });
    }
    /**
     * 
     * @param formArray 
     * @param indexToRemove 
     */
    removeCustomField(formArray, indexToRemove) {
        formArray.removeAt(indexToRemove);
    } 
    /**
     * 
     * @param formArray 
     */
    addCustomField(formArray: FormArray) {
        formArray.insert(0, new FormControl())
    }

    generateHslaColors () :string {
        let huedelta = Math.trunc(360),
            hue = Math.floor(Math.random() * huedelta),
            color = `hsla(${hue},50%,60%)`;
        return color;
      }


    /**
     *
     * @param vigile
     */
    save(vigile: Vigile) {

        
        this.vigileService.save(vigile).subscribe(data => {

            this.messageEvent.next({
                success: data['success'],
                message: data['message']
            });
            if (data['success'])
                this.router.navigate(['../../', data['data']['id']], {relativeTo: this.activeRoute});
        })

    }
    /**
     *
     * @param vigile
     */
    update(vigile: Vigile) {

        this.vigileService.update(vigile).subscribe(data => {

            this.messageEvent.next({
                success: data['success'],
                message: data['message']
            });
        });
    }
    /**
     *
     * @param vigile
     */
    onClickConferma() {
        const record = Object.assign({}, this.myForm.value);

        const {
            id,
            extra_mail,
            extra_phone,
            birthday
        } = record;

        if (extra_mail) {
            for (let i = 0; i <= extra_mail.length; i++) {
                Object.assign(record, {
                    ['mail' + (i + 1)]: extra_mail[i]
                })
            }
            delete record.extra_mail;
        }

        if (extra_phone) {
            for (let i = 0; i <= extra_phone.length; i++) {
                Object.assign(record, {
                    ['phone' + (i + 1)]: extra_phone[i]
                })
            }
            delete record.extra_phone;
        }


        record.birthday = formattaData(birthday);
        if (!id) {
            record.color = this.generateHslaColors();
            this.save(record);
        } else {
            this.update(record);
        }
    }
    /**
     *
     * @param idCity
     */
    fetchTown(idCity) {
        return this.generalService.listComuni(idCity).pipe(map(resp => resp.data));
    }
    /**
     *
     */
    fetchCity() {
        return this.generalService.listProvincie().pipe(map(risp => risp.data));
    }
    /**
     *
     */
    fetchPatenti() {
        return this.personService.listByArea(1).pipe(map(risp => risp.data));
    }

    ngOnInit() {

        this.listCity$ = this.fetchCity();
        this.patenti$ = this.fetchPatenti();

        this.listTown$ = this.myForm.get('istatProvincia')
            .valueChanges
            .pipe(
                takeUntil(this._destroyed),
                filter(istatProvincia => istatProvincia != null),
                switchMap(istatProvincia => this.fetchTown(istatProvincia))
            );

        this.activeRoute
            .parent
            .params
            .pipe(
                takeUntil(this._destroyed),
                map(params => params['id']),
            )
            .subscribe( idVigile => {
                if (idVigile && idVigile  > 0) {
                    this.store.dispatch(new VigiliDetailAction.FetchingAction( idVigile ));
                } else {
                    // nuovo inserimento
                    this.myForm.reset();
                }
            })
    }

    ngOnDestroy() {
        this._destroyed.next();
        this._destroyed.complete();
    }
}
