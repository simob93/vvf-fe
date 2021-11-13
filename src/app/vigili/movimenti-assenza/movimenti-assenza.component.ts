import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movimenti-assenza',
  templateUrl: './movimenti-assenza.component.html',
  styleUrls: ['./movimenti-assenza.component.scss']
})
export class MovimentiAssenzaComponent implements OnInit {
  idVigile: string;
  constructor(
    private  router: ActivatedRoute
  ) { }

  ngOnInit() {
    this.idVigile = this.router.snapshot.paramMap.get('id'); //è l'id del vigile

  }

}
