import { Component, OnInit, ViewChild } from '@angular/core';
import { CategorieListComponent } from '../categorie-list/categorie-list.component';
import { CategorieFormComponent } from '../categorie-form/categorie-form.component';

@Component({
  selector: 'mag-categorie-page',
  templateUrl: './categorie-page.component.html',
  styleUrls: ['./categorie-page.component.scss']
})
export class CategoriePageComponent implements OnInit {

  @ViewChild(CategorieListComponent) private categorieListCmp: CategorieListComponent;
  @ViewChild(CategorieFormComponent) private categorieFormCmp: CategorieFormComponent;

  constructor() { }

  /**
   * 
   * @param record 
   */
  onSelectionChange(record) {
    this.categorieFormCmp.loadData(record && record['id']);
  }
  /**
   * 
   * @param resp 
   */
  onAfterSave(resp) {
    this.categorieListCmp.loadGridData(resp.id);
  }
  /**
   * 
   */
  onAfterDelete() {
    this.categorieListCmp.loadGridData(null);
  }

  ngOnInit() {

  }

}
