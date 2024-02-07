import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import { SettingsComponent } from './features/settings/settings/settings.component';
import { LoginComponent } from './auth/login/login.component';
import { hasTokenGuard } from './auth/guards/has-token.guard';
import { MyStoriesComponent } from './features/story/my-stories/my-stories.component';
import { LandingComponent } from './landing/landing/landing.component';
import { LandingContentComponent } from './landing/landing-content/landing-content.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    children: [
      {
        path: '',
        component: LandingContentComponent,
      },
    ],
  },
  {
    path: 'app',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./features/home/home.module').then((m) => m.HomeModule),
        canActivate: [hasTokenGuard],
      },
      {
        path: 'my-projects',
        loadChildren: () =>
          import('./features/project/project.module').then(
            (m) => m.ProjectModule
          ),
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
        path: '**',
        redirectTo: 'home',
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
