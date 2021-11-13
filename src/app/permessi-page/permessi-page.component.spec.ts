import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermessiPageComponent } from './permessi-page.component';

describe('PermessiPageComponent', () => {
  let component: PermessiPageComponent;
  let fixture: ComponentFixture<PermessiPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermessiPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermessiPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
