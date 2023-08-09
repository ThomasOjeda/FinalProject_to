import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoryDetailsComponent } from './story-details/story-details.component';
import { TaskModule } from '../task/task.module';

@NgModule({
  declarations: [StoryDetailsComponent],
  imports: [CommonModule, TaskModule],
})
export class StoryModule {}
