import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlatListVigiliComponent } from './flat-list-vigili.component';

describe('FlatListVigiliComponent', () => {
  let component: FlatListVigiliComponent;
  let fixture: ComponentFixture<FlatListVigiliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlatListVigiliComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlatListVigiliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
