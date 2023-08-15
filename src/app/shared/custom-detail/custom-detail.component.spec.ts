import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomDetailComponent } from './custom-detail.component';

describe('CustomDetailComponent', () => {
  let component: CustomDetailComponent;
  let fixture: ComponentFixture<CustomDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomDetailComponent],
    });
    fixture = TestBed.createComponent(CustomDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
