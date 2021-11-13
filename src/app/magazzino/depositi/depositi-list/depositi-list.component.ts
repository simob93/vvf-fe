import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';

import { BehaviorSubject, Subject } from 'rxjs';
import { Deposito } from 'src/app/model';
import { tap, takeUntil, map } from 'rxjs/operators';
import { MagazzinoService } from 'src/app/service/magazzino.service';

@Component({
	selector: 'mag-depositi-list',
	templateUrl: './depositi-list.component.html',
	styleUrls: ['./depositi-list.component.scss']
})
export class DepositiListComponent implements OnInit, OnDestroy {
	gridApi: any;
	private _onDestroy: Subject<any> = new Subject<any>();
	@Output() selectionChange: EventEmitter<Deposito> = new EventEmitter<Deposito>();
	displayedColumns: any = [
		{
			headerName: 'Descrizione',
			flex: 1,
			field: 'descrizione'
		},
		{
			headerName: 'attivo',
			width: 95,
			field: 'attivo',
			cellRenderer: (params) => {
				if (params.value) {
					return '<div class="icon-checked"></div>';
				}
				return '';

			}
		}

	]

	constructor(private warehouseService: MagazzinoService) { }
	ngOnDestroy(): void {

		this._onDestroy.next();
		this._onDestroy.complete();
	}

	/**
	   * 
	   */
	getRowNodeId = (data) => data.id

	/**
	 * 
	 * @param idSel 
	 */
	loadGridData(idSel?) {
		this.gridApi.deselectAll();
		this.warehouseService.listDepositi(null)
			.pipe(
				takeUntil(this._onDestroy),
				map(response => response.data)
			).subscribe(data => {
				this.gridApi.setRowData(data);
				if (data) {
					if (idSel) {
						// seleziono la riga 
						const recSel = this.gridApi.getRowNode(idSel);
						if (recSel)
							recSel.setSelected(true, true);
					}
				}
			});
	}

	onSelectionChanged() {
		const record = this.gridApi.getSelectedRows()[0] as Deposito;
		this.selectionChange.emit(record);
	}

	/**
	   * 
	   * @param params 
	   */
	onGridReady(params) {
		this.gridApi = params.api;
		this.gridApi.hideOverlay();
		this.loadGridData();

	}

	ngOnInit() {
	}

}
