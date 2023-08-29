import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyProjectsComponent } from './my-projects/my-projects.component';
import { ProjectDataComponent } from './project-data/project-data.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProjectDetailsComponent } from './project-data/project-details/project-details.component';
import { ProjectEpicsComponent } from './project-data/project-epics/project-epics.component';

@NgModule({
  declarations: [
    MyProjectsComponent,
    ProjectDataComponent,
    ProjectDetailsComponent,
    ProjectEpicsComponent,
  ],
  imports: [CommonModule, SharedModule],
})
export class ProjectModule {}
