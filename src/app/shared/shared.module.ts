import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryCardComponent } from './summary-card/summary-card.component';
import { CustomButtonComponent } from './custom-button/custom-button.component';

@NgModule({
  declarations: [SummaryCardComponent, CustomButtonComponent],
  imports: [CommonModule],
  exports: [SummaryCardComponent, CustomButtonComponent],
})
export class SharedModule {}
