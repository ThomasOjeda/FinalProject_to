import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TaskService } from '../services/task.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AddTaskDialogService } from '../services/add-task-dialog.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-task-form',
  templateUrl: './add-task-dialog.component.html',
  styleUrls: ['./add-task-dialog.component.scss'],
})
export class AddTaskDialogComponent implements OnInit, OnDestroy {
  isOpen: boolean = false;
  taskForm!: FormGroup;
  dialogSubscription: Subscription = new Subscription();

  @ViewChild('dialog') dialog!: ElementRef;
  constructor(
    private taskService: TaskService,
    private formBuilderService: FormBuilder,
    private addTaskDialogService: AddTaskDialogService
  ) {}

  ngOnInit(): void {
    this.taskForm = this.formBuilderService.group({
      name: new FormControl(''),
      description: new FormControl(''),
      dueDate: new FormControl(new Date()),
      done: new FormControl(false),
    });
    this.dialogSubscription = this.addTaskDialogService
      .getState$()
      .subscribe((state) => {
        this.isOpen = state;
        if (state) this.openDialog();
        else this.closeDialog();
      });
  }
  openDialog() {
    this.dialog.nativeElement.showModal();
  }
  closeDialog() {
    setTimeout(() => this.dialog.nativeElement.close(), 200);
  }
  submit() {
    console.log(this.taskForm.value);
  }

  handleCloseDialogButtonClick() {
    this.addTaskDialogService.setState(false);
  }
  ngOnDestroy(): void {
    this.dialogSubscription.unsubscribe();
  }
}
