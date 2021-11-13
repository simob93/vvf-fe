import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortocolliEditComponent } from './portocolli-edit.component';

describe('PortocolliEditComponent', () => {
  let component: PortocolliEditComponent;
  let fixture: ComponentFixture<PortocolliEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortocolliEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortocolliEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
