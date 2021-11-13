import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gradi',
  templateUrl: './gradi.component.html',
  styleUrls: ['./gradi.component.scss']
})
export class GradiComponent implements OnInit {

  idVigile: string;
  constructor(
    private  router: ActivatedRoute
  ) { }

  ngOnInit() {
    this.idVigile = this.router.snapshot.paramMap.get('id'); //è l'id del vigile

  }

}
