import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoryDetailsComponent } from './story-details/story-details.component';
import { TaskModule } from '../task/task.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { MyStoriesComponent } from './my-stories/my-stories.component';
import { UserModule } from '../user/user.module';

@NgModule({
  declarations: [StoryDetailsComponent, MyStoriesComponent],
  imports: [CommonModule, CoreModule, SharedModule, TaskModule, UserModule],
})
export class StoryModule {}
