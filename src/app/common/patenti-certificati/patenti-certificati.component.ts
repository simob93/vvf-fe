import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-patenti-certificati',
    templateUrl: './patenti-certificati.component.html',
    styleUrls: ['./patenti-certificati.component.scss']
})
export class PatentiCertificatiComponent implements OnInit {

    @Input() listItem = [];
    @Input() listPerson = [];
    @Input() idVigile: number;
    @Input() title: string = "";
    @Input() mode:number = 0; //0 = patenti 1 = certificati
    @Output('onRemoveElement') removeElement: EventEmitter<any> = new EventEmitter<any>();
    id: number = -9999;

    getNewId() {
        return ++this.id;
    }

    onClickBtnNew() {
        let object = {
            id: this.getNewId(),
            idVigile: this.idVigile
        }
        this.listItem.splice(0, 0, object);
    }

    onRemoveElement(element) { 

        //rimuobo l'elemento solamente se sono in inserimento con id negativo
        if (element['id'] < 0) {
            let idx = this.listItem.findIndex(rec => rec.id == element.id);
            if (idx >= 0) {
                this.listItem.splice(idx, 1);
            }
        } else {
           this.removeElement.emit(element);
        }
    }

    constructor() { }

    ngOnInit() {
    }

}
