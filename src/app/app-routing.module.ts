import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaceholderComponent } from './placeholder/placeholder.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: PlaceholderComponent,
      },
      {
        path: 'my-projects',
        component: PlaceholderComponent,
      },
      {
        path: 'my-projects/:project-id',
        component: PlaceholderComponent,
      },
      {
        path: 'my-projects/:project-id/:epic-id',
        component: PlaceholderComponent,
      },
      {
        path: 'my-projects/:project-id/:epic-id/:story-id',
        component: PlaceholderComponent,
      },
      {
        path: 'my-stories',
        component: PlaceholderComponent,
      },
      {
        path: 'settings',
        component: PlaceholderComponent,
      },
    ],
  },
  {
    path: 'login',
    component: PlaceholderComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
