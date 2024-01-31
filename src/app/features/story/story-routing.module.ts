import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoryDataComponent } from './story-data/story-data.component';

const routes: Routes = [
  {
    path: '',
    component: StoryDataComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoryRoutingModule {}
