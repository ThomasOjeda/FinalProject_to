import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyProjectsComponent } from './my-projects/my-projects.component';
import { ProjectDataComponent } from './project-data/project-data.component';
import { hasTokenGuard } from 'src/app/auth/guards/has-token.guard';

const routes: Routes = [
  {
    path: '',
    component: MyProjectsComponent,
  },
  {
    path: ':project-id',
    canActivate: [hasTokenGuard],
    children: [
      {
        path: '',
        component: ProjectDataComponent,
      },
      {
        path: ':epic-id',
        loadChildren: () =>
          import('../epic/epic.module').then((m) => m.EpicModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectRoutingModule {}
