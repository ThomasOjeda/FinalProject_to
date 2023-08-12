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
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent implements OnInit, OnDestroy {
  isOpen: boolean = false;
  confirmed: boolean = false;
  @Input() commands$!: Observable<boolean>;
  commandsSubscription: Subscription = new Subscription();
  @Output() result = new EventEmitter<boolean>();
  @ViewChild('dialog') dialog!: ElementRef;

  constructor() {}

  ngOnInit(): void {
    this.commandsSubscription = this.commands$.subscribe((state) => {
      this.confirmed = false;
      if (state) {
        this.openDialog();
      } else {
        this.closeDialog();
      }
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
    this.confirmed = true;
    this.result.emit(true);
  }

  handleCloseButtonClick() {
    this.result.emit(false);
  }

  ngOnDestroy(): void {
    this.commandsSubscription.unsubscribe();
  }
}
