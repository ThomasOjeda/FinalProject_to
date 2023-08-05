import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaceholderComponent } from './placeholder/placeholder.component';
import { HomeComponent } from './features/home/home/home.component';
import { LayoutComponent } from './core/layout/layout.component';
import { MyProjectsComponent } from './features/project/my-projects/my-projects.component';
import { SettingsComponent } from './features/settings/settings/settings.component';

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
        component: MyProjectsComponent,
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
        component: SettingsComponent,
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
