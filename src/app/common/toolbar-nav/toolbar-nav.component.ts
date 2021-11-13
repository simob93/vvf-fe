import { Component, OnInit, Input } from '@angular/core';
import {Location} from '@angular/common';

@Component({
    selector: 'app-toolbar-nav',
    templateUrl: './toolbar-nav.component.html',
    styleUrls: ['./toolbar-nav.component.scss']
})
export class ToolbarNavComponent implements OnInit {
    @Input() title: string = "";
    constructor(private _location: Location) { }

    onClickBtnBack() {
        this._location.back();
    }

    ngOnInit() {
    }

}
