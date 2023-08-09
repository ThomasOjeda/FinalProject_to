import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaceholderComponent } from './placeholder/placeholder.component';
import { HomeComponent } from './features/home/home/home.component';
import { LayoutComponent } from './core/layout/layout.component';
import { MyProjectsComponent } from './features/project/my-projects/my-projects.component';
import { SettingsComponent } from './features/settings/settings/settings.component';
import { ProjectDetailsComponent } from './features/project/project-details/project-details.component';
import { EpicDetailsComponent } from './features/epic/epic-details/epic-details.component';
import { StoryDetailsComponent } from './features/story/story-details/story-details.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'my-projects',
        component: MyProjectsComponent,
      },
      {
        path: 'my-projects/:project-id',
        component: ProjectDetailsComponent,
      },
      {
        path: 'my-projects/:project-id/:epic-id',
        component: EpicDetailsComponent,
      },
      {
        path: 'my-projects/:project-id/:epic-id/:story-id',
        component: StoryDetailsComponent,
      },
      {
        path: 'my-stories',
        component: PlaceholderComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
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
