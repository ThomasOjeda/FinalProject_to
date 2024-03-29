import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryCardComponent } from './summary-card/summary-card.component';
import { CustomButtonComponent } from './custom-button/custom-button.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { CustomIconButtonComponent } from './custom-icon-button/custom-icon-button.component';
import { CustomDetailComponent } from './custom-detail/custom-detail.component';
import { SectionHeaderComponent } from './section-header/section-header.component';
import { InputErrorComponent } from './input-error/input-error.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { AlertMessageComponent } from './alert-message/alert-message.component';
import { ThemeDirective } from './directives/theme.directive';
import { MemberCardComponent } from './user/member-card/member-card.component';
import { ClosableDialogComponent } from './closable-dialog/closable-dialog.component';
import { MemberListComponent } from './member-list/member-list.component';
import { OwnerDetailsComponent } from './owner-details/owner-details.component';
import { SlideShowComponent } from './slide-show/slide-show.component';

@NgModule({
  declarations: [
    SummaryCardComponent,
    CustomButtonComponent,
    ConfirmationComponent,
    CustomIconButtonComponent,
    CustomDetailComponent,
    SectionHeaderComponent,
    InputErrorComponent,
    LoadingSpinnerComponent,
    AlertMessageComponent,
    MemberCardComponent,
    ThemeDirective,
    ClosableDialogComponent,
    MemberListComponent,
    OwnerDetailsComponent,
    SlideShowComponent,
  ],
  imports: [CommonModule],
  exports: [
    SummaryCardComponent,
    CustomButtonComponent,
    ConfirmationComponent,
    CustomIconButtonComponent,
    CustomDetailComponent,
    SectionHeaderComponent,
    InputErrorComponent,
    LoadingSpinnerComponent,
    AlertMessageComponent,
    MemberCardComponent,
    ThemeDirective,
    ClosableDialogComponent,
    MemberListComponent,
    OwnerDetailsComponent,
    SlideShowComponent,
  ],
})
export class SharedModule {}
