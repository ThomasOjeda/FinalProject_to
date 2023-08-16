import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from 'src/models/task';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  @Input() task: Task = { _id: '', name: '', story: '' };
  @Output() deleteTask = new EventEmitter<Task>();
  theme!: string;

  /*   theme$: Observable<string> = new Observable<string>();
  themeSubscription: Subscription = new Subscription(); */

  constructor(
    private taskService: TaskService,
    private routerService: Router,
    private activatedRouteService: ActivatedRoute
  ) {}
  ngOnInit(): void {
    /*     this.theme$ = this.themes.getTheme$();
    this.themeSubscription = this.theme$.subscribe((t) => (this.theme = t)); */
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
}
