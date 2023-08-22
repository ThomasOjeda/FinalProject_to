import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosableDialogComponent } from './closable-dialog.component';

describe('ClosableDialogComponent', () => {
  let component: ClosableDialogComponent;
  let fixture: ComponentFixture<ClosableDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClosableDialogComponent]
    });
    fixture = TestBed.createComponent(ClosableDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
