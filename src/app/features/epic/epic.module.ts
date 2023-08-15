import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EpicDetailsComponent } from './epic-details/epic-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [EpicDetailsComponent],
  imports: [CommonModule, CoreModule, SharedModule],
})
export class EpicModule {}
