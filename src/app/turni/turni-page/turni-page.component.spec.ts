import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurniPageComponent } from './turni-page.component';

describe('TurniPageComponent', () => {
  let component: TurniPageComponent;
  let fixture: ComponentFixture<TurniPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurniPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurniPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
