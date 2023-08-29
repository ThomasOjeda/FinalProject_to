import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoryDataComponent } from './story-data/story-data.component';
import { TaskModule } from '../task/task.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MyStoriesComponent } from './my-stories/my-stories.component';
import { StoryDetailsComponent } from './story-data/story-details/story-details.component';

@NgModule({
  declarations: [StoryDataComponent, MyStoriesComponent, StoryDetailsComponent],
  imports: [CommonModule, SharedModule, TaskModule],
})
export class StoryModule {}
