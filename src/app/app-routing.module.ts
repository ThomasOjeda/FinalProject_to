import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaceholderComponent } from './placeholder/placeholder.component';
import { HomeComponent } from './features/home/home/home.component';
import { LayoutComponent } from './core/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
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
