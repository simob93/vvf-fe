import { Component, OnInit, Input } from '@angular/core';
import { Carriera } from 'src/app/model';
import { Observable } from 'rxjs';
import { CarrieraService } from 'src/app/service/carriera.service';

@Component({
  selector: 'app-list-mansioni',
  templateUrl: './list-mansioni.component.html',
  styleUrls: ['./list-mansioni.component.scss']
})
export class ListMansioniComponent implements OnInit {

  @Input() idVigile: number
  recCarriera: Carriera;
  selectedRowIndex: number = -1;
  listCarriera$: Observable<Carriera[]>;
  displayedColumns: String[] = ['dal', 'al', 'tipo'];
  constructor(
    private carrieraService: CarrieraService
  ) { }
  /**
   * 
   * @param assenza 
   */
  onClickEdit(carriera: Carriera) {
      this.selectedRowIndex = carriera.id;
      this.recCarriera = Object.assign({}, carriera);
  }

  onAfterOperation() {
    this.fetchData();
  }

  fetchData() {
    this.listCarriera$ = this.carrieraService.listBy(this.idVigile);
  }

  ngOnInit() {
    this.fetchData();
    
  }

}
