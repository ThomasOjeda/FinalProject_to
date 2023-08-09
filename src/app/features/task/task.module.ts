import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTaskFormComponent } from './add-task-form/add-task-form.component';
import { TasksComponent } from './tasks-component/tasks.component';
import { ListComponent } from './list/list.component';

import { TaskComponent } from './task/task.component';
import { TaskNameComponent } from './task/task-name/task-name.component';
import { CheckboxComponent } from './task/checkbox/checkbox.component';
import { AddTaskInputComponent } from './add-task-form/add-task-input/add-task-input.component';
import { FormsModule } from '@angular/forms';
import { UpdateTaskComponent } from './update-task/update-task.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  declarations: [
    AddTaskFormComponent,
    TasksComponent,
    ListComponent,
    TaskComponent,
    TaskNameComponent,
    CheckboxComponent,
    AddTaskInputComponent,
    UpdateTaskComponent,
    TaskDetailsComponent,
  ],
  imports: [CommonModule, FormsModule, RouterModule, SharedModule],
  exports: [TasksComponent],
})
export class TaskModule {}
