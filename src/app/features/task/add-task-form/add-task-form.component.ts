import {
  Component,
  ElementRef,
  EventEmitter,
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
import { Task } from 'src/models/task';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-task-form',
  templateUrl: './add-task-form.component.html',
  styleUrls: ['./add-task-form.component.scss'],
})
export class AddTaskFormComponent implements OnInit {
  isOpen: boolean = false;
  taskForm!: FormGroup;

  @Output() result = new EventEmitter<boolean>();
  submitting: boolean = false;
  thereWasAnError: boolean = false;

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
  }

  submit() {
    this.submitting = true;
    this.thereWasAnError = false;

    let newTask: Task = this.taskForm.value;
    let story = this.activatedRouteService.snapshot.paramMap.get('story-id');
    if (story) {
      newTask.story = story;
      this.taskService.addTask$(newTask).subscribe({
        next: () => {},
        error: (error) => {
          this.submitting = false;
          this.thereWasAnError = true;
        },
        complete: () => {
          this.submitting = false;
          this.thereWasAnError = false;
          this.result.emit(true);
        },
      });
    } else {
      this.submitting = false;
    }
  }

  handleAlertClose() {
    this.thereWasAnError = false;
  }
}
