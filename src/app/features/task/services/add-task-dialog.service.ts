import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddTaskDialogService {
  isOpen: boolean = false;
  state$: Subject<boolean> = new Subject();
  taskCreationEvent$: Subject<void> = new Subject();
  constructor() {}

  setState(state: boolean) {
    this.isOpen = state;
    this.state$.next(this.isOpen);
  }
  getState$() {
    return this.state$.asObservable();
  }
  getTaskCreationEvent$() {
    return this.taskCreationEvent$.asObservable();
  }

  signalTaskCreation() {
    this.taskCreationEvent$.next();
  }
}
