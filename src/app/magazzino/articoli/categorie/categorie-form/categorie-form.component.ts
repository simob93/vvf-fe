import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MagazzinoService } from 'src/app/service/magazzino.service';
import { sporcaForm } from 'src/app/utils/functions';
import { StandardMessageComponent } from 'src/app/common/standard-message/standard-message.component';
import { filter, map } from 'rxjs/operators';

@Component({
	selector: 'mag-categorie-form',
	templateUrl: './categorie-form.component.html',
	styleUrls: ['./categorie-form.component.scss']
})
export class CategorieFormComponent implements OnInit {

	myForm: FormGroup;
	idCategoria: number;
	@Output() afterSave: EventEmitter<any> = new EventEmitter<any>();
	@Output() afterDelete: EventEmitter<any> = new EventEmitter<any>();

	constructor(
		private formBuilder: FormBuilder,
		private dialog: MatDialog,
		private warehouseService: MagazzinoService) { }

	onClickBtnNuovo() {
		this.myForm.reset();
		sporcaForm(this.myForm);

	}

	onClickBtnElimina() {
		const {
			id
		} = this.myForm.value

		this.dialog.open(StandardMessageComponent, {
			data: {
				type: 'DEL',
				callbackOnOk: () => {
					this.warehouseService.deleteCategoria(id)
						.pipe(
							filter(resp => resp.success)
						)
						.subscribe(resp => {
							this.afterDelete.emit(resp.data);
						});
				}
			}
		});


	}

	onClickBtnRipristina() {
		if (this.idCategoria) {
			this.loadData(this.idCategoria);
		} else {
			this.myForm.reset();
		}
	}

	onClickBtnConferma() {
		let record = this.myForm.value;
		const {
			id
		} = record
		if (!id) {
			this.warehouseService.saveCategoria(record)
				.pipe(
					filter(resp => resp.success)
				)
				.subscribe(resp => {
					this.afterSave.emit(resp.data);
				});
		} else {
			this.warehouseService.updateCategoria(record)
				.pipe(
					filter(resp => resp.success)
				)
				.subscribe(resp => {
					this.afterSave.emit(resp.data);
				});
		}

	}
	/**
	 * 
	 * @param id 
	 */
	loadData(id) {
		this.idCategoria = id;
		this.myForm.reset();
		//resetStateForm(this.myForm);

		if (!this.idCategoria) return;

		this.warehouseService.getCategoria(this.idCategoria)
			.pipe(
				filter(resp => resp.success),
				map(resp => resp.data)
			)
			.subscribe(data => {
				this.myForm.patchValue(data);
			})
	}

	ngOnInit() {
		this.myForm = this.formBuilder.group({
			id: [''],
			etichetta: ['', []],
			descrizione: ['', [Validators.required]]
		})
	}

}
