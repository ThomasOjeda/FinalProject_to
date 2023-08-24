import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-closable-dialog',
  templateUrl: './closable-dialog.component.html',
  styleUrls: ['./closable-dialog.component.scss'],
})
export class ClosableDialogComponent {
  isOpen: boolean = false;
  @Input() commands$!: Observable<string>;
  commandsSubscription: Subscription = new Subscription();

  @ViewChild('dialog') dialog!: ElementRef;
  constructor() {}

  ngOnInit(): void {
    this.commandsSubscription = this.commands$.subscribe((state) => {
      if (state == 'open') this.openDialog();

      if (state == 'close') this.closeDialog();
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

  ngOnDestroy(): void {
    this.commandsSubscription.unsubscribe();
  }
}
