import { Component, OnInit, Input } from '@angular/core';
import { AssenzeService } from 'src/app/service/assenzeService';
import { Observable } from 'rxjs';
import { Assenza } from 'src/app/model';

@Component({
  selector: 'app-list-assenze',
  templateUrl: './list-assenze.component.html',
  styleUrls: ['./list-assenze.component.scss']
})
export class ListAssenzeComponent implements OnInit {

  @Input() idVigile: number
  recAssenza: Assenza;
  selectedRowIndex: number = -1;
  listAssenze$: Observable<Assenza[]>;
  displayedColumns: String[] = ['dal', 'al', 'motivoFormatted'];
  constructor(
    private assenzeService: AssenzeService
  ) { }
  /**
   * 
   * @param assenza 
   */
  onClickEditAssenza(assenza: Assenza) {
      this.selectedRowIndex = assenza.id;
      this.recAssenza = Object.assign({}, assenza);
  }

  onAfterOperation() {
    this.fetchData();
  }

  fetchData() {
    this.listAssenze$ = this.assenzeService.listBy(this.idVigile);
  }

  ngOnInit() {
    this.fetchData();
    
  }

}
