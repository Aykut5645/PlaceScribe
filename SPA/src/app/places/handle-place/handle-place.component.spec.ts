import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandlePlaceComponent } from './handle-place.component';

describe('HandlePlaceComponent', () => {
  let component: HandlePlaceComponent;
  let fixture: ComponentFixture<HandlePlaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HandlePlaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HandlePlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
