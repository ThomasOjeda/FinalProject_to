import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoryDetailsComponent } from './story-details/story-details.component';
import { TaskModule } from '../task/task.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [StoryDetailsComponent],
  imports: [CommonModule, SharedModule, TaskModule],
})
export class StoryModule {}
