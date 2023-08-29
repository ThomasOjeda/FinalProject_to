import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EpicDataComponent } from './epic-data/epic-data.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EpicDetailsComponent } from './epic-data/epic-details/epic-details.component';
import { EpicStoriesComponent } from './epic-data/epic-stories/epic-stories.component';

@NgModule({
  declarations: [EpicDataComponent, EpicDetailsComponent, EpicStoriesComponent],
  imports: [CommonModule, SharedModule],
})
export class EpicModule {}
