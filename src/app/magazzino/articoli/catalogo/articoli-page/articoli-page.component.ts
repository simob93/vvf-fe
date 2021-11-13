import { Component, OnInit, ViewChild } from '@angular/core';
import { ArticoliListComponent } from '../articoli-list/articoli-list.component';
import { ArticoliFormComponent } from '../articoli-form/articoli-form.component';
import { ArticoloSharedService } from 'src/app/service/articolo-shared.service';

@Component({
  selector: 'mag-articoli-page',
  templateUrl: './articoli-page.component.html',
  styleUrls: ['./articoli-page.component.scss']
})
export class ArticoliPageComponent implements OnInit {

  @ViewChild(ArticoliListComponent) private articoliListCmp: ArticoliListComponent;
  @ViewChild(ArticoliFormComponent) private articoliFormCmp: ArticoliFormComponent;

  constructor(
    private articoloSharedService: ArticoloSharedService
  ) { }

  /**
   * 
   * @param record 
   */
  onSelectionChange(record) {
    this.articoloSharedService.nextArticolo(record && record.id);

  }
  /**
   * 
   * @param resp 
   */
  onAfterSave(resp) {
    console.log(resp)
    this.articoliListCmp.loadGridData(resp.id);
  }
  /**
   * 
   */
  onAfterDelete() {
    this.articoliListCmp.loadGridData(null);
  }

  ngOnInit() {

  }

}
