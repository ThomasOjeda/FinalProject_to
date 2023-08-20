import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
  selector: 'app-summary-card',
  templateUrl: './summary-card.component.html',
  styleUrls: ['./summary-card.component.scss'],
})
export class SummaryCardComponent implements OnInit, OnDestroy {
  @Input() name: string | undefined;
  @Input() description: string | undefined;
  @Input() icon: string | undefined;
  @Input() type: string | undefined;
  @Input() accent: string | undefined;
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
