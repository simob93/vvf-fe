import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MagazzinoPageComponent } from './magazzino-page.component';

describe('MagazzinoPageComponent', () => {
  let component: MagazzinoPageComponent;
  let fixture: ComponentFixture<MagazzinoPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MagazzinoPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MagazzinoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
