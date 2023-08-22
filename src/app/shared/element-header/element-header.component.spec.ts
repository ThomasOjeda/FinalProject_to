import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementHeaderComponent } from './element-header.component';

describe('ElementHeaderComponent', () => {
  let component: ElementHeaderComponent;
  let fixture: ComponentFixture<ElementHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ElementHeaderComponent]
    });
    fixture = TestBed.createComponent(ElementHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
