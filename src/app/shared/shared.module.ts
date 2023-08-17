import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryCardComponent } from './summary-card/summary-card.component';
import { CustomButtonComponent } from './custom-button/custom-button.component';
import { DividerComponent } from './divider/divider.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { CustomIconButtonComponent } from './custom-icon-button/custom-icon-button.component';
import { CustomDetailComponent } from './custom-detail/custom-detail.component';
import { SectionHeaderComponent } from './section-header/section-header.component';
import { InputErrorComponent } from './input-error/input-error.component';
import { LoadingSpinnerComponent } from './loading-screen/loading-spinner.component';
import { AlertMessageComponent } from './alert-message/alert-message.component';

@NgModule({
  declarations: [
    SummaryCardComponent,
    CustomButtonComponent,
    DividerComponent,
    ConfirmationDialogComponent,
    CustomIconButtonComponent,
    CustomDetailComponent,
    SectionHeaderComponent,
    InputErrorComponent,
    LoadingSpinnerComponent,
    AlertMessageComponent,
  ],
  imports: [CommonModule],
  exports: [
    SummaryCardComponent,
    CustomButtonComponent,
    DividerComponent,
    ConfirmationDialogComponent,
    CustomIconButtonComponent,
    CustomDetailComponent,
    SectionHeaderComponent,
    InputErrorComponent,
    LoadingSpinnerComponent,
    AlertMessageComponent,
  ],
})
export class SharedModule {}
