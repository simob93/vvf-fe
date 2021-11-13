import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimentiAssenzaComponent } from './movimenti-assenza.component';

describe('MovimentiAssenzaComponent', () => {
  let component: MovimentiAssenzaComponent;
  let fixture: ComponentFixture<MovimentiAssenzaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovimentiAssenzaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovimentiAssenzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
