import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyProjectsComponent } from './my-projects/my-projects.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { SummaryCardComponent } from './summary-card/summary-card.component';

@NgModule({
  declarations: [MyProjectsComponent, ProjectDetailsComponent, SummaryCardComponent],
  imports: [CommonModule],
})
export class ProjectModule {}
