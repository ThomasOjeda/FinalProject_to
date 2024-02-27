import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavItem2Component } from './nav-item2.component';

describe('NavItem2Component', () => {
  let component: NavItem2Component;
  let fixture: ComponentFixture<NavItem2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavItem2Component]
    });
    fixture = TestBed.createComponent(NavItem2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
