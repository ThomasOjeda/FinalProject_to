import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryCardComponent } from './summary-card/summary-card.component';
import { CustomButtonComponent } from './custom-button/custom-button.component';
import { DividerComponent } from './divider/divider.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { CustomIconButtonComponent } from './custom-icon-button/custom-icon-button.component';
import { CustomDetailComponent } from './custom-detail/custom-detail.component';

@NgModule({
  declarations: [
    SummaryCardComponent,
    CustomButtonComponent,
    DividerComponent,
    ConfirmationDialogComponent,
    CustomIconButtonComponent,
    CustomDetailComponent,
  ],
  imports: [CommonModule],
  exports: [
    SummaryCardComponent,
    CustomButtonComponent,
    DividerComponent,
    ConfirmationDialogComponent,
    CustomIconButtonComponent,
    CustomDetailComponent,
  ],
})
export class SharedModule {}
