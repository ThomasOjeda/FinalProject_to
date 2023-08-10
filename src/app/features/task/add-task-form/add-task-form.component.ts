import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TaskService } from '../services/task.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AddTaskDialogService } from '../services/add-task-dialog.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-task-form',
  templateUrl: './add-task-form.component.html',
  styleUrls: ['./add-task-form.component.scss'],
})
export class AddTaskFormComponent implements OnInit, OnDestroy {
  myForm!: FormGroup;
  dialogSubscription: Subscription = new Subscription();

  @ViewChild('dialog') dialog!: ElementRef;
  constructor(
    private taskService: TaskService,
    private formBuilderService: FormBuilder,
    private addTaskDialogServie: AddTaskDialogService
  ) {}

  ngOnInit(): void {
    this.myForm = this.formBuilderService.group({
      name: new FormControl(''),
      status: new FormControl(''),
    });
    this.dialogSubscription = this.addTaskDialogServie
      .getState$()
      .subscribe((state) => {
        if (state) this.openDialog();
      });
  }
  openDialog() {
    this.dialog.nativeElement.showModal();
  }
  submit() {}
  ngOnDestroy(): void {
    this.dialogSubscription.unsubscribe();
  }
}
