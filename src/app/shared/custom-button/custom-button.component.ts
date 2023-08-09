import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
/* import { ThemeService } from 'src/app/services/theme.service';
 */
@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.scss'],
})
export class CustomButtonComponent implements OnInit, OnDestroy {
  @Output() clickedButtonEvent = new EventEmitter();
  @Input() iconPath: string = '';
  @Input() iconAlt: string = '';
  @Input() text: string = '';
  @Input() buttonType: string = '';

  displayText = false;
  displayIcon = false;

  theme!: string;

  theme$: Observable<string> = new Observable<string>();
  themeSubscription: Subscription = new Subscription();
  constructor(/* private ts: ThemeService */) {}

  ngOnInit(): void {
    if (this.buttonType == 'text' || this.buttonType == 'text&icon')
      this.displayText = true;
    if (this.buttonType == 'icon' || this.buttonType == 'text&icon')
      this.displayIcon = true;

    /*     this.theme$ = this.ts.getTheme$();
     */ this.themeSubscription = this.theme$.subscribe((t) => (this.theme = t));
  }
  buttonWasClicked($event: Event) {
    this.clickedButtonEvent.emit($event);
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
}
