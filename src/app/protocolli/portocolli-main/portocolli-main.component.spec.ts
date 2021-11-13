import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortocolliMainComponent } from './portocolli-main.component';

describe('PortocolliMainComponent', () => {
  let component: PortocolliMainComponent;
  let fixture: ComponentFixture<PortocolliMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortocolliMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortocolliMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
