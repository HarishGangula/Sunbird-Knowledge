import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnPopupComponent } from './sn-popup.component';

describe('SnPopupComponent', () => {
  let component: SnPopupComponent;
  let fixture: ComponentFixture<SnPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
