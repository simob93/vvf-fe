import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'comm-portlet-std',
  templateUrl: './portlet-std.component.html',
  styleUrls: ['./portlet-std.component.scss']
})
export class PortletStdComponent implements OnInit {
  @Input() icon: String = '';
  @Input() height: number = 0;
  @Input() classStyle: String = '';
  @Input() title: string = "Titolo non definito!";
  @Input() showBtnLink: boolean = true;
  constructor() { }

  ngOnInit() {
  }

}
