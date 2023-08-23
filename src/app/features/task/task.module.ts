import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTaskFormComponent } from './add-task-form/add-task-form.component';
import { ListComponent } from './list/list.component';

import { TaskComponent } from './task/task.component';
import { TaskNameComponent } from './task/task-name/task-name.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateTaskComponent } from './update-task/update-task.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
@NgModule({
  declarations: [
    AddTaskFormComponent,
    ListComponent,
    TaskComponent,
    TaskNameComponent,
    UpdateTaskComponent,
    TaskDetailsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CoreModule,
    SharedModule,
  ],
  exports: [ListComponent],
})
export class TaskModule {}
