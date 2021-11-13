import { Component, OnInit } from '@angular/core';
import { KeyValue } from '../model/keyValue';
import { GestProfiliService } from '../service/profili-shared.service';

@Component({
  selector: 'app-profili-page',
  templateUrl: './profili-page.component.html',
  styleUrls: ['./profili-page.component.scss']
})
export class ProfiliPageComponent implements OnInit {
  constructor() { }
  
  ngOnInit() {
  }

}
