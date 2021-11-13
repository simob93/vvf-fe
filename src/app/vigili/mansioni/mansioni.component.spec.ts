import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MansioniComponent } from './mansioni.component';

describe('MansioniComponent', () => {
  let component: MansioniComponent;
  let fixture: ComponentFixture<MansioniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MansioniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MansioniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
