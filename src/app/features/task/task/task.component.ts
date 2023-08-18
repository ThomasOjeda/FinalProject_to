import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from 'src/models/task';
import { ActivatedRoute, Router } from '@angular/router';
import { ThemeService } from 'src/app/core/services/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit, OnDestroy {
  @Input() task: Task = { _id: '', name: '', story: '' };
  @Output() deleteTask = new EventEmitter<Task>();

  theme!: string;
  themeSubscription: Subscription = new Subscription();

  constructor(
    private taskService: TaskService,
    private routerService: Router,
    private activatedRouteService: ActivatedRoute,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.themeSubscription = this.themeService
      .getTheme$()
      .subscribe((theme) => (this.theme = theme));
  }

  handleTaskNameClick() {
    this.routerService.navigate([this.task._id], {
      relativeTo: this.activatedRouteService,
    });
  }

  handleCheckboxToggle() {
    this.task.done = !this.task.done;
    console.log(this.task.done);
    this.taskService.updateTask(this.task).subscribe({
      next: () => {},
      error: () => {
        this.task.done = !this.task.done;
      },
      complete: () => {},
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
