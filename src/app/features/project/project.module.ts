import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyProjectsComponent } from './my-projects/my-projects.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';

@NgModule({
  declarations: [MyProjectsComponent, ProjectDetailsComponent],
  imports: [CommonModule],
})
export class ProjectModule {}
