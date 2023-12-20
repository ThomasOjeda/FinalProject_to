import {
  Component,
  EventEmitter,
  OnInit,
  Output,
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
  isOpen = false;
  taskForm!: FormGroup;

  @Output() addTaskResult = new EventEmitter<boolean>();
  submitting = false;
  thereWasAnError = false;

  constructor(
    private taskService: TaskService,
    private formBuilderService: FormBuilder,
    private activatedRouteService: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.taskForm = this.formBuilderService.group({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.minLength(10)]),
      due: new FormControl(undefined),
      done: new FormControl(false),
    });
  }

  submit() {
    this.submitting = true;
    this.thereWasAnError = false;

    const newTask: Task = this.taskForm.value;

    const story = this.activatedRouteService.snapshot.paramMap.get('story-id');
    if (story) {
      newTask.story = story;
      this.taskService.addTask$(newTask).subscribe({
        error: () => {
          this.submitting = false;
          this.thereWasAnError = true;
        },
        complete: () => {
          this.taskForm.reset();
          this.submitting = false;
          this.thereWasAnError = false;
          this.addTaskResult.emit(true);
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
