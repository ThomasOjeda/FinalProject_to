import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTaskDialogComponent } from './add-task-dialog/add-task-dialog.component';
import { ListComponent } from './list/list.component';

import { TaskComponent } from './task/task.component';
import { TaskNameComponent } from './task/task-name/task-name.component';
import { CheckboxComponent } from './task/checkbox/checkbox.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateTaskComponent } from './update-task/update-task.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  declarations: [
    AddTaskDialogComponent,
    ListComponent,
    TaskComponent,
    TaskNameComponent,
    CheckboxComponent,
    UpdateTaskComponent,
    TaskDetailsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
  ],
  exports: [ListComponent, AddTaskDialogComponent],
})
export class TaskModule {}
