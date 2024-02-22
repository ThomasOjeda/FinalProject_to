import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavColumnContentComponent } from './nav-column-content.component';

describe('NavColumnContentComponent', () => {
  let component: NavColumnContentComponent;
  let fixture: ComponentFixture<NavColumnContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavColumnContentComponent]
    });
    fixture = TestBed.createComponent(NavColumnContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
