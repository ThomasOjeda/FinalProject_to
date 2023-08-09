import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
/* import { ThemeService } from 'src/app/services/theme.service';
 */ import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-add-task-form',
  templateUrl: './add-task-form.component.html',
  styleUrls: ['./add-task-form.component.scss'],
})
export class AddTaskFormComponent implements OnInit, OnDestroy {
  newTaskName!: string;

  theme!: string;

  theme$: Observable<string> = new Observable<string>();
  themeSubscription: Subscription = new Subscription();
  constructor(
    private taskService: TaskService /* , private themes: ThemeService */
  ) {}
  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
  ngOnInit(): void {
    /*     this.theme$ = this.themes.getTheme$();
     */ this.themeSubscription = this.theme$.subscribe((t) => (this.theme = t));
  }
  handleInputChange(newValue: string) {
    this.newTaskName = newValue;
  }
  handleButtonClick() {
    /*     this.taskService.addTask(this.newTaskName);
     */
  }
}
