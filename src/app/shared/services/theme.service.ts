import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  theme: string = 'system';
  theme$: BehaviorSubject<string>;
  constructor(private localStorageService: LocalStorageService) {
    let theme = this.localStorageService.getItem('theme');
    if (theme) this.theme = JSON.parse(theme);
    this.theme$ = new BehaviorSubject<string>(this.theme);
  }

  getTheme$() {
    return this.theme$.asObservable();
  }

  setTheme(theme: string) {
    this.theme = theme;
    this.theme$.next(this.theme);
    this.saveChanges();
  }

  private saveChanges() {
    this.localStorageService.setItem('theme', JSON.stringify(this.theme));
  }
}
