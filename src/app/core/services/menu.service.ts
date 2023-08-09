import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor() {}
  menuState$: Subject<boolean> = new Subject<boolean>();

  getMenuState$() {
    return this.menuState$.asObservable();
  }
  openMenu() {
    this.menuState$.next(true);
  }
  closeMenu() {
    this.menuState$.next(false);
  }
}
