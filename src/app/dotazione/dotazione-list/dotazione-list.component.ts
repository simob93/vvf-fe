import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { MagazzinoService } from 'src/app/service/magazzino.service';
import { takeUntil, map } from 'rxjs/operators';
import { Dotazione } from 'src/app/model';
import { VigileService } from 'src/app/service';
import { formattaData, isValidID } from 'src/app/utils/functions';

@Component({
	selector: 'dotazione-list',
	templateUrl: './dotazione-list.component.html',
	styleUrls: ['./dotazione-list.component.scss']
})
export class DotazioneListComponent implements OnInit, OnChanges  {

	gridApi: any;
	private _onDestroy: Subject<any> = new Subject<any>();
	
	@Input() idVigile: number;
	@Output() selectionChange: EventEmitter<Dotazione> = new EventEmitter<Dotazione>();
	displayedColumns: any = [
		{
			headerName: 'Data consegna',
			width: 140,
			field: 'data',
			cellRenderer: params => formattaData(params.data.data, "DD/MM/YYYY")

		},
		{
			headerName: 'Articolo',
			flex: 1,
			field: 'valore',
			ellStyle: {'white-space': 'normal'}
		}
	]

	constructor(private vigileService: VigileService) { }

	ngOnChanges(changes: SimpleChanges): void {
		if (changes.idVigile && (this.gridApi != null)) {
			this.loadGridData();
		}
	}
	ngOnDestroy(): void {

		this._onDestroy.next();
		this._onDestroy.complete();
	}

	/**
	   * 
	   */
	getRowNodeId = (data) => data.codice

	/**
	 * 
	 * @param idSel 
	 */
	loadGridData(idSel?) {
		this.gridApi.deselectAll();
		this.vigileService.listDotazioniCbox(this.idVigile)
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
		const record = this.gridApi.getSelectedRows()[0] as Dotazione;
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
