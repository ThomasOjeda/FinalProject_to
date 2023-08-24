import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoryDetailsComponent } from './story-details/story-details.component';
import { TaskModule } from '../task/task.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MyStoriesComponent } from './my-stories/my-stories.component';

@NgModule({
  declarations: [StoryDetailsComponent, MyStoriesComponent],
  imports: [CommonModule, SharedModule, TaskModule],
})
export class StoryModule {}
