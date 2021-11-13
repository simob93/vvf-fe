import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VigiliNavComponent } from './vigili-nav.component';

describe('VigiliNavComponent', () => {
  let component: VigiliNavComponent;
  let fixture: ComponentFixture<VigiliNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VigiliNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VigiliNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
