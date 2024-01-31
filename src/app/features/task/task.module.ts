import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTaskFormComponent } from './add-task-form/add-task-form.component';
import { TaskListComponent } from './task-list/task-list.component';

import { TaskComponent } from './task/task.component';
import { TaskNameComponent } from './task/task-name/task-name.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateTaskComponent } from './update-task/update-task.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TaskRoutingModule } from './task-routing.module';
@NgModule({
  declarations: [
    AddTaskFormComponent,
    TaskListComponent,
    TaskComponent,
    TaskNameComponent,
    UpdateTaskComponent,
    TaskDetailsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    TaskRoutingModule,
  ],
  exports: [TaskListComponent, TaskRoutingModule],
})
export class TaskModule {}
