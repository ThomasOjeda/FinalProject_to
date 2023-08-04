import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '', //home
      },
      {
        path: 'my-projects',
      },
      {
        path: 'my-projects/:project-id',
      },
      {
        path: 'my-projects/:project-id/:epic-id',
      },
      {
        path: 'my-projects/:project-id/:epic-id/story-id',
      },
      {
        path: 'my-stories',
      },
      {
        path: 'settings',
      },
    ],
  },
  {
    path: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
