import {
  AfterViewChecked,
  AfterViewInit,
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
import { Task } from 'src/models/task';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-task-dialog',
  templateUrl: './add-task-dialog.component.html',
  styleUrls: ['./add-task-dialog.component.scss'],
})
export class AddTaskDialogComponent implements OnInit, OnDestroy {
  isOpen: boolean = false;
  taskForm!: FormGroup;
  dialogSubscription: Subscription = new Subscription();
  requestPending: boolean = false;
  submitting: boolean = false;
  thereWasAnError: boolean = false;

  @ViewChild('dialog') dialog!: ElementRef;
  constructor(
    private taskService: TaskService,
    private formBuilderService: FormBuilder,
    private addTaskDialogService: AddTaskDialogService,
    private activatedRouteService: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.taskForm = this.formBuilderService.group({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.minLength(4)]),
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
    this.submitting = true;
    let newTask: Task = this.taskForm.value;
    let story = this.activatedRouteService.snapshot.paramMap.get('story-id');
    if (story) {
      newTask.story = story;
      this.requestPending = true;
      this.taskService.addTask$(newTask).subscribe({
        next: () => {},
        error: (error) => {
          this.submitting = false;
          this.thereWasAnError = true;
        },
        complete: () => {
          this.submitting = false;

          this.requestPending = false;
          this.handleCloseDialogButtonClick();
          this.addTaskDialogService.signalTaskCreation();
        },
      });
    } else {
      this.submitting = false;
    }
  }

  handleCloseDialogButtonClick() {
    this.addTaskDialogService.setState(false);
  }

  handleAlertClose() {
    this.thereWasAnError = false;
  }
  ngOnDestroy(): void {
    this.dialogSubscription.unsubscribe();
  }
}
