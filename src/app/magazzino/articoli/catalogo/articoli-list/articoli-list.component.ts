import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Articolo } from 'src/app/model';
import { MagazzinoService } from 'src/app/service/magazzino.service';
import { takeUntil, map } from 'rxjs/operators';

@Component({
	selector: 'mag-articoli-list',
	templateUrl: './articoli-list.component.html',
	styleUrls: ['./articoli-list.component.scss']
})
export class ArticoliListComponent implements OnInit {

	gridApi: any;
	private _onDestroy: Subject<any> = new Subject<any>();
	@Output() selectionChange: EventEmitter<Articolo> = new EventEmitter<Articolo>();
	displayedColumns: any = [
		{
			headerName: 'Articolo',
			flex: 1,
			field: 'descrizione'
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
		this.warehouseService.listArticoli(null)
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
		const record = this.gridApi.getSelectedRows()[0] as Articolo;
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
