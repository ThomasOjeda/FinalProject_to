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

import { Observable, Subscription, catchError } from 'rxjs';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent implements OnInit, OnDestroy {
  isOpen: boolean = false;
  confirmed: boolean = false;
  @Input() commands$!: Observable<string>;
  commandsSubscription: Subscription = new Subscription();
  @Output() result = new EventEmitter<boolean>();
  @ViewChild('dialog') dialog!: ElementRef;
  error: boolean = false;
  errorMessage: string = '';
  constructor() {}

  ngOnInit(): void {
    this.commandsSubscription = this.commands$.subscribe({
      next: (state) => {
        this.confirmed = false;
        if (state == 'true') {
          this.openDialog();
        } else if (state == 'false') {
          this.closeDialog();
        } else {
          this.error = true;
          this.errorMessage = state;
        }
      },
      error: (error) => {},
      complete: () => {},
    });
  }
  openDialog() {
    this.isOpen = true;
    this.dialog.nativeElement.showModal();
  }
  closeDialog() {
    this.isOpen = false;
    setTimeout(() => this.dialog.nativeElement.close(), 200);
  }

  handleConfirmButtonClick() {
    this.error = false;

    this.confirmed = true;
    this.result.emit(true);
  }

  handleCloseButtonClick() {
    this.error = false;

    this.result.emit(false);
  }

  ngOnDestroy(): void {
    this.commandsSubscription.unsubscribe();
  }
}
