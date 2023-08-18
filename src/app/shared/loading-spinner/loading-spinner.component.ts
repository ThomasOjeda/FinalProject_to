import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss'],
})
export class LoadingSpinnerComponent implements OnInit, OnDestroy {
  @Input() size: string = 'small';
  @Input() color: string = 'primary';

  theme: string = '';
  themeSubscription: Subscription = new Subscription();

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeSubscription = this.themeService
      .getTheme$()
      .subscribe((theme) => {
        this.theme = theme;
      });
  }
  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
