import { Component, Input, OnInit } from '@angular/core';
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

  receiveDoneEvent($event: boolean) {
    //should output a signal to parent
  }

  handleDeleteButtonClick() {
    //should output a signal to parent
  }

  handleTaskNameClick() {
    this.routerService.navigate([this.task._id], {
      relativeTo: this.activatedRouteService,
    });
  }
}
