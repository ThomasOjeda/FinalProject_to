import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent implements OnInit, OnDestroy {
  @Input() commands$!: Observable<string>;
  @Input() option1!: string;
  @Input() option1Color!: string;

  @Input() option2!: string;
  @Input() option2Color!: string;

  @Output() confirmationResult = new EventEmitter<string>();

  waitingForFeedback = false;
  commandsSubscription: Subscription = new Subscription();
  error = false;
  errorMessage = '';


  ngOnInit(): void {
    this.commandsSubscription = this.commands$.subscribe({
      next: (state) => {
        if (state != 'open' && state != 'close') {
          this.error = true;
          this.waitingForFeedback = false;
          this.errorMessage = state;
        }
      },
      error: () => {
        this.waitingForFeedback = false;
      },
    });
  }

  handleOption1Click() {
    this.error = false;
    this.waitingForFeedback = true;
    this.confirmationResult.emit('op1');
  }

  handleOption2Click() {
    this.error = false;
    this.confirmationResult.emit('op2');
  }

  handleAlertClose() {
    this.error = false;
  }

  ngOnDestroy(): void {
    this.commandsSubscription.unsubscribe();
  }
}
