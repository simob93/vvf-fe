import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-servizio',
  templateUrl: './servizio.component.html',
  styleUrls: ['./servizio.component.scss']
})
export class ServizioComponent implements OnInit {
  idVigile: string;
  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

      this.idVigile = this.route.snapshot.paramMap.get('id');
  }

}
