import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomDetailsComponent } from './custom-details.component';

describe('CustomDetailsComponent', () => {
  let component: CustomDetailsComponent;
  let fixture: ComponentFixture<CustomDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomDetailsComponent]
    });
    fixture = TestBed.createComponent(CustomDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
