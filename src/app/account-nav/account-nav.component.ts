import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-nav',
  templateUrl: './account-nav.component.html',
  styleUrls: ['./account-nav.component.scss']
})
export class AccountNavComponent implements OnInit {

  navLinks: Array<any> =  [
    {
        label: 'UTENTI',
        path: 'utenti'
    },
    {
        label: 'PROFILI_PERMESSI',
        path: 'profili'
    }
];

  constructor() { }

  ngOnInit() {
  }

}
