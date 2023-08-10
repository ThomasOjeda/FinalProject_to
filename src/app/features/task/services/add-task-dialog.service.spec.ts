import { TestBed } from '@angular/core/testing';

import { AddTaskDialogService } from './add-task-dialog.service';

describe('AddTaskDialogService', () => {
  let service: AddTaskDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddTaskDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
