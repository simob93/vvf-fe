import { Component, OnInit, ViewChild } from '@angular/core';
import { DepositiListComponent } from '../depositi-list/depositi-list.component';
import { DepositiFormComponent } from '../depositi-form/depositi-form.component';

@Component({
  selector: 'mag-depositi-page',
  templateUrl: './depositi-page.component.html',
  styleUrls: ['./depositi-page.component.scss']
})
export class DepositiPageComponent implements OnInit {

  @ViewChild(DepositiListComponent) private depositiListCmp: DepositiListComponent;
  @ViewChild(DepositiFormComponent) private depositiFromCmp: DepositiFormComponent;

  constructor() { }

  /**
   * 
   * @param record 
   */
  onSelectionChange(record) {
    this.depositiFromCmp.loadData(record && record['id']);
  }
  /**
   * 
   * @param resp 
   */
  onAfterSave(resp) {
    this.depositiListCmp.loadGridData(resp.id);
  }
  /**
   * 
   */
  onAfterDelete() {
    this.depositiListCmp.loadGridData(null);
  }

  ngOnInit() {
  }

}
