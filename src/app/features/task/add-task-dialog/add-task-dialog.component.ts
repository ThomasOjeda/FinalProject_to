import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { TaskService } from '../services/task.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
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
  @Input() commands$!: Observable<string>;
  commandsSubscription: Subscription = new Subscription();
  @Output() result = new EventEmitter<boolean>();
  requestPending: boolean = false;
  submitting: boolean = false;
  thereWasAnError: boolean = false;

  @ViewChild('dialog') dialog!: ElementRef;
  constructor(
    private taskService: TaskService,
    private formBuilderService: FormBuilder,
    private activatedRouteService: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.taskForm = this.formBuilderService.group({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.minLength(10)]),
      dueDate: new FormControl(new Date()),
      done: new FormControl(false),
    });
    this.commandsSubscription = this.commands$.subscribe((state) => {
      if (state == 'open') {
        this.openDialog();
      } else this.closeDialog();
    });
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
          this.closeDialog();
          this.result.emit(true);
        },
      });
    } else {
      this.submitting = false;
    }
  }

  openDialog() {
    this.isOpen = true;
    this.dialog.nativeElement.showModal();
  }
  closeDialog() {
    this.isOpen = false;
    setTimeout(() => this.dialog.nativeElement.close(), 200);
  }

  handleAlertClose() {
    this.thereWasAnError = false;
  }
  ngOnDestroy(): void {
    this.commandsSubscription.unsubscribe();
  }
}
