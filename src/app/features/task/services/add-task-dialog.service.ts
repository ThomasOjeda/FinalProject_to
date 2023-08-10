import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddTaskDialogService {
  isOpen: boolean = false;
  state$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor() {}

  setState(state: boolean) {
    this.isOpen = state;
    this.state$.next(this.isOpen);
  }
  getState$() {
    return this.state$.asObservable();
  }
}
