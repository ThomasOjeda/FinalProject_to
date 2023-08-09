import { Component, Input, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from 'src/models/task';

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

  constructor(private taskService: TaskService) {}
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
}
