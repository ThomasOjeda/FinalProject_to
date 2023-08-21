import { Component, Renderer2 } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ThemeService } from './shared/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private renderer: Renderer2,
    private themeService: ThemeService
  ) {}

  theme!: string;

  theme$: Observable<string> = new Observable<string>();
  themeSubscription: Subscription = new Subscription();

  setClass(newClass: string) {
    const body = this.renderer.selectRootElement('body', true);
    this.renderer.removeClass(body, 'body-theme-system');
    this.renderer.removeClass(body, 'body-theme-light');
    this.renderer.removeClass(body, 'body-theme-dark');

    this.renderer.addClass(body, newClass);
  }

  ngOnInit(): void {
    this.theme$ = this.themeService.getTheme$();

    this.themeSubscription = this.theme$.subscribe((theme) => {
      switch (theme) {
        case 'light':
          this.setClass('body-theme-light');
          break;
        case 'dark':
          this.setClass('body-theme-dark');
          break;
        default:
          this.setClass('body-theme-system');
          break;
      }
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
