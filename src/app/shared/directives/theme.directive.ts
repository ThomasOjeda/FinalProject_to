import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemeService } from '../services/theme.service';

@Directive({
  selector: '[appTheme]',
})
export class ThemeDirective implements OnInit, OnDestroy {
  @Input() systemThemeClass: string = '';
  @Input() lightThemeClass: string = '';
  @Input() darkThemeClass: string = '';

  themeSubscription: Subscription = new Subscription();
  constructor(
    private element: ElementRef,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.themeSubscription = this.themeService
      .getTheme$()
      .subscribe((theme) => this.switchClasses(theme));
  }
  switchClasses(theme: string): void {
    this.element.nativeElement.classList.remove(this.systemThemeClass);
    this.element.nativeElement.classList.remove(this.lightThemeClass);
    this.element.nativeElement.classList.remove(this.darkThemeClass);

    switch (theme) {
      case 'system':
        this.element.nativeElement.classList.add(this.systemThemeClass);
        break;
      case 'light':
        this.element.nativeElement.classList.add(this.lightThemeClass);
        break;
      case 'dark':
        this.element.nativeElement.classList.add(this.darkThemeClass);
        break;
      default:
        break;
    }
  }
  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
