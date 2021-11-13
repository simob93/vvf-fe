import { Component, OnInit } from '@angular/core';

export interface Section {
  name: string,
  link: string,
  icon: string
}

@Component({
  selector: 'app-magazzino-page',
  templateUrl: './magazzino-page.component.html',
  styleUrls: ['./magazzino-page.component.scss']
})
export class MagazzinoPageComponent implements OnInit {
  
DEPOSITO: Section[] = [
  {
    name: 'DEPOSITI',
    link: 'depositi',
    icon: 'maps_home_work',
  },
];

CATALOGO: Section[] = [
  {
    name: 'CATEGORIE',
    link: 'categorie',
    icon: 'maps_home_work'
  },
  {
    name: 'ARTICOLI',
    link: 'articoli',
    icon: 'maps_home_work'
  }
]
  constructor() {

  }
  ngOnInit(): void {

  }
}
