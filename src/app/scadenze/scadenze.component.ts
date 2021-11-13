import { Component, OnInit } from '@angular/core';
import { ScadenzeService } from '../service/scadenze.service';
import { PersonService } from '../service';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import { combineLatest, observable } from 'rxjs';
import { concatMap, map, switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-scadenze',
    templateUrl: './scadenze.component.html',
    styleUrls: ['./scadenze.component.scss']
})
export class ScadenzeComponent implements OnInit {
    listPerson = [];
    dataSource = [];
    displayedColums = [];
    searchForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private scadenzeService: ScadenzeService,
        private personService: PersonService
    ) { 

    }

    onClickFiltra() {
        this.fetchData();
    }

    onClickCell(scadenza) {
        // empty method
    }

   

    onClickPrintAutorizz() {
        this.scadenzeService.print('report/certified');
    }

    onClickPrint() {
        this.scadenzeService.print('report');
    }
    /**
     * ritorna i dati delle scadenze 
     * @param columns  
     */
    getDataTable(columns) {
        return this.scadenzeService.getCal(columns).pipe(map(resp => resp['data']));
    }
    /**
     * ritorna le colonne da mostrare 
     */
    getColumnsForTable() {

        const {
            columns
        } = this.searchForm.value;

        return this.scadenzeService.getColumnsTable(columns)
        .pipe(
            map(resp => {

            let colonne =  [];
            colonne.push({
                field: 'nominativo',
                width: 200,
                pinned: 'left',
                filter: true,
                headerName: 'Vigile',
                cellRenderer: null
            });

            let groups = {};
            let appoName = null;
            resp['data'].forEach(col => {

                if (appoName != col['name']) {
                    groups = {
                        marryChildren: true,
                        children: []
                    };
                    colonne.push(groups);
                }
                groups['headerName'] = col['name'];
                groups['children'].push({
                    field: col['valore'], 
                    cellStyle: {'border-right': '1px solid #e2e2e2', textAlign:'center'},
                    autoHeight: true, 
                    width: 100,
                    headerName: col['extra'],
                    tooltipValueGetter: (params) => params.value && params.value.dateExpiration,
                    cellRenderer: (params) => {
                        return params.value && `<img align="center" width="24" height="24" src="assets/images/time-left-${params.value.stato == 1 ? 'green' : (params.value.stato == 0 ? 'orange' : 'red')}.svg" />`
                    } 
                });
                appoName = col['name'];
                
            })
            return {columns, tableColumns: colonne};
        }))
    }

    fetchData(cmd?) {
        //init
        this.displayedColums = [];
        this.dataSource = [];
        //chiamata per scaricarmi le colonne dinamiche 
        this.getColumnsForTable().pipe(
            switchMap(columns => 
                //chiamata per recuperare i dati che andranno in tabella 
                this.getDataTable(columns.columns)
                .pipe(
                    map(resp => ({dataTable: resp, tableColumns:columns.tableColumns }))
                ))
        )
        .subscribe(response => {
            this.displayedColums = response.tableColumns; //genero le colonne
            this.dataSource = JSON.parse(response.dataTable); //genero i dati
        });
    }
   
   
    ngOnInit() {

        this.searchForm = this.formBuilder.group({
            columns: []
        });
        this.fetchData();
        this.personService.listByArea('5,2').subscribe(data => {
            this.listPerson = data['data'];
        });
    }

}
