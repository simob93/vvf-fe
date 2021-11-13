import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mansioni',
  templateUrl: './mansioni.component.html',
  styleUrls: ['./mansioni.component.scss']
})
export class MansioniComponent implements OnInit {

  idVigile: string;
  constructor(
    private  router: ActivatedRoute
  ) { }

  ngOnInit() {
    this.idVigile = this.router.snapshot.paramMap.get('id'); //è l'id del vigile

  }

}
