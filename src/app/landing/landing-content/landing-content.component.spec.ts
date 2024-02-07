import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingContentComponent } from './landing-content.component';

describe('LandingContentComponent', () => {
  let component: LandingContentComponent;
  let fixture: ComponentFixture<LandingContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LandingContentComponent]
    });
    fixture = TestBed.createComponent(LandingContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
