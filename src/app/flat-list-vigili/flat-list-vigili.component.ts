import {Component, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';
import {PersonService, VigileService} from '../service';
import {FormGroup, FormBuilder} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import {takeUntil, startWith, pairwise, map, take} from 'rxjs/operators';
import {Person} from '../model';

export interface InfoInteface {
    total?: number;
    active?: number;
    waiting?: number;
    deActive?: number
}

@Component({
    selector: 'app-flat-list-vigili',
    templateUrl: './flat-list-vigili.component.html',
    styleUrls: ['./flat-list-vigili.component.scss']
})


export class FlatListVigiliComponent implements OnInit, OnDestroy {
    vigileSel;
    listSquadre$: Observable<Person[]> = null;
    filteredList = [];
    private _onDestory: Subject<any> = new Subject();
    info: InfoInteface = {
        total: 0,
        active: 0,
        waiting: 0,
        deActive: 0
    };
    listVigili = [];
    myForm: FormGroup;
    @Output('itemClick') itemClick: EventEmitter<any> = new EventEmitter<any>();


    constructor(
        private formBuilder: FormBuilder,
        private personService: PersonService,
        private vigileService: VigileService
    ) {
    }

    ngOnDestroy(): void {
        this._onDestory.next();
        this._onDestory.complete();
    }

    /**
     *
     * @param vigile
     */
    onItemClick(vigile) {
        this.vigileSel = null;
        this.vigileSel = vigile;
        this.itemClick.emit(vigile);
    }

    /**
     *
     * @param event
     */
    filterList(value) {
        value = value.toUpperCase();
        this.filteredList = Object.assign([], this.listVigili).filter(vigile =>
            vigile.firstName.toUpperCase().includes(value) || vigile.lastName.toUpperCase().includes(value));
        this.info.total = this.filteredList && this.filteredList.length || 0;

    }

    fetchData() {
        const params = Object.assign({}, {
            nonAttivi: this.myForm.get('nonAttivi').value,
            idSquadra: this.myForm.get('idSquadra').value,
            assenti: this.myForm.get('assenti').value
        });
        this.vigileService.listV2(params).subscribe(detail => {
            this.listVigili = detail['data'];
            this.filteredList = Object.assign([], this.listVigili);
            this.info.total = this.listVigili && this.listVigili.length || 0;
        });
    }

    ngOnInit() {

        this.myForm = this.formBuilder.group({
            nominativo: [''],
            idSquadra: [''],
            nonAttivi: [false],
            assenti: [false]
        });

        this.listSquadre$ = this.personService.listByArea(10).pipe(map(result => result.data));

        this.myForm.controls.idSquadra.valueChanges
            .pipe(takeUntil(this._onDestory))
            .subscribe(data => this.fetchData());

        this.myForm.controls.nominativo.valueChanges
            .pipe(takeUntil(this._onDestory))
            .subscribe(
                (data) => this.filterList(data));

        this.myForm.controls.assenti.valueChanges
            .pipe(takeUntil(this._onDestory))
            .subscribe(
                (data) => this.fetchData());

        this.myForm.controls.nonAttivi.valueChanges
            .pipe(takeUntil(this._onDestory))
            .subscribe(
                (data) => this.fetchData());

        this.fetchData();

    }

}
