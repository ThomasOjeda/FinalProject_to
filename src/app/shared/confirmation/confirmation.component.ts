import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
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

  @Output() result = new EventEmitter<string>();

  waitingForFeedback: boolean = false;
  commandsSubscription: Subscription = new Subscription();
  error: boolean = false;
  errorMessage: string = '';

  constructor() {}

  ngOnInit(): void {
    this.commandsSubscription = this.commands$.subscribe({
      next: (state) => {
        if (state != 'open' && state != 'close') {
          this.error = true;
          this.waitingForFeedback = false;
          this.errorMessage = state;
        }
      },
      error: (error) => {
        this.waitingForFeedback = false;
      },
      complete: () => {},
    });
  }

  handleOption1Click() {
    this.error = false;
    this.waitingForFeedback = true;
    this.result.emit('op1');
  }

  handleOption2Click() {
    this.error = false;
    this.result.emit('op2');
  }

  handleAlertClose() {
    this.error = false;
  }

  ngOnDestroy(): void {
    this.commandsSubscription.unsubscribe();
  }
}
