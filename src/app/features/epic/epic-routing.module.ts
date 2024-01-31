import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EpicDataComponent } from './epic-data/epic-data.component';
import { hasTokenGuard } from 'src/app/auth/guards/has-token.guard';

const routes: Routes = [
  {
    path: '',
    component: EpicDataComponent,
  },
  {
    path: ':story-id',
    loadChildren: () =>
      import('../story/story.module').then((m) => m.StoryModule),
    canActivate: [hasTokenGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EpicRoutingModule {}
