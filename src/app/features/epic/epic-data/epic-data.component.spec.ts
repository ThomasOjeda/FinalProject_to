import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpicDataComponent } from './epic-data.component';

describe('EpicDataComponent', () => {
  let component: EpicDataComponent;
  let fixture: ComponentFixture<EpicDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EpicDataComponent],
    });
    fixture = TestBed.createComponent(EpicDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
