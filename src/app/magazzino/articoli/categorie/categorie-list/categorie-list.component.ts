import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { MagazzinoService } from 'src/app/service/magazzino.service';
import { takeUntil, map } from 'rxjs/operators';
import { Categoria } from 'src/app/model';

@Component({
  selector: 'mag-categorie-list',
  templateUrl: './categorie-list.component.html',
  styleUrls: ['./categorie-list.component.scss']
})
export class CategorieListComponent implements OnInit {

  gridApi: any;
	private _onDestroy: Subject<any> = new Subject<any>();
	@Output() selectionChange: EventEmitter<Categoria> = new EventEmitter<Categoria>();
	displayedColumns: any = [
		{
			headerName: 'Descrizione',
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
		this.warehouseService.listCategorie()
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
		const record = this.gridApi.getSelectedRows()[0] as Categoria;
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
