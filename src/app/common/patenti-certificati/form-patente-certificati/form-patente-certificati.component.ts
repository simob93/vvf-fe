import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Person } from '../../../model';
import { PersonScadenze } from '../../../model/person';

@Component({
    selector: 'app-form-patente-certificati',
    templateUrl: './form-patente-certificati.component.html',
    styleUrls: ['./form-patente-certificati.component.scss']
})
export class FormPatenteCertificatiComponent implements OnInit {

    @Input() item: PersonScadenze;
    @Input() listaPerson: Person[] = [];
    @Input() mode: number = 0;
    @Output('onRemoveElement') removeElement: EventEmitter<any> = new EventEmitter<any>();

    onClickBtnRemove(record) {
        this.removeElement.emit(record);
    }

    constructor() { }

    ngOnInit() {

    }

}
