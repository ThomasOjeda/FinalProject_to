import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EpicDetailsComponent } from './epic-details/epic-details.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [EpicDetailsComponent],
  imports: [CommonModule, SharedModule],
})
export class EpicModule {}
