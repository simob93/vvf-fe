import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as moment from 'moment';
import { TurniService } from 'src/app/service/turni-service.service';

@Component({
	selector: 'app-turni-opt-stampa',
	templateUrl: './turni-opt-stampa.component.html',
	styleUrls: ['./turni-opt-stampa.component.scss']
})
export class TurniOptStampaComponent implements OnInit {
	myForm: FormGroup;
	params: any = {};
	constructor(
		private formBuilder: FormBuilder,
		@Inject(MAT_DIALOG_DATA) private data,
		private dialog: MatDialogRef<any>,
		private turniService: TurniService
	) {
		this.params = data || {};

	}

	onClickBtnPrint() {

		let {
			dal,
			al
		} = this.myForm.value;

		if (!dal || !al) return;

		this.turniService.print(dal.format('YYYY-MM-DD'), al.format('YYYY-MM-DD'));
	}


	ngOnInit() {

		this.myForm = this.formBuilder.group({
			dal: [],
			al: []
		});

		if (this.params['fromNewTurnario']) {
			this.myForm.get('dal').setValue(moment())
			this.myForm.get('dal').disable();
		}

	}

}
