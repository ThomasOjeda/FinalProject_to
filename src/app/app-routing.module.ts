import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home/home.component';
import { LayoutComponent } from './core/layout/layout.component';
import { MyProjectsComponent } from './features/project/my-projects/my-projects.component';
import { SettingsComponent } from './features/settings/settings/settings.component';
import { ProjectDataComponent } from './features/project/project-data/project-data.component';
import { EpicDataComponent } from './features/epic/epic-data/epic-data.component';
import { StoryDetailsComponent } from './features/story/story-details/story-details.component';
import { TaskDetailsComponent } from './features/task/task-details/task-details.component';
import { LoginComponent } from './auth/login/login.component';
import { hasTokenGuard } from './auth/guards/has-token.guard';
import { MyStoriesComponent } from './features/story/my-stories/my-stories.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [hasTokenGuard],
      },
      {
        path: 'my-projects',
        component: MyProjectsComponent,
        canActivate: [hasTokenGuard],
      },
      {
        path: 'my-projects/:project-id',
        component: ProjectDataComponent,
        canActivate: [hasTokenGuard],
      },
      {
        path: 'my-projects/:project-id/:epic-id',
        component: EpicDataComponent,
        canActivate: [hasTokenGuard],
      },
      {
        path: 'my-projects/:project-id/:epic-id/:story-id',
        component: StoryDetailsComponent,
        canActivate: [hasTokenGuard],
      },
      {
        path: 'my-projects/:project-id/:epic-id/:story-id/:task-id',
        component: TaskDetailsComponent,
        canActivate: [hasTokenGuard],
      },
      {
        path: 'my-stories',
        component: MyStoriesComponent,
        canActivate: [hasTokenGuard],
      },
      {
        path: 'settings',
        component: SettingsComponent,
        canActivate: [hasTokenGuard],
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
    component: LoginComponent,
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
