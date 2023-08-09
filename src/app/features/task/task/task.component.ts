import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TaskService } from '../services/task.service';
/* import { ClipboardService } from 'src/app/services/clipboard.service';
import { ShareService } from 'src/app/services/share.service';
import { TasksService } from 'src/app/services/tasks.service';
import { ThemeService } from 'src/app/services/theme.service'; */

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  @Input() taskName: string = '';
  @Input() checked: boolean = false;
  @Input() id: number = -1;

  theme!: string;

  theme$: Observable<string> = new Observable<string>();
  themeSubscription: Subscription = new Subscription();

  constructor(
    private taskService: TaskService /*     private cbs: ClipboardService,
    private ss: ShareService,
    private themes: ThemeService */
  ) {}
  ngOnInit(): void {
    /*     this.theme$ = this.themes.getTheme$();
     */ this.themeSubscription = this.theme$.subscribe((t) => (this.theme = t));
  }

  receiveCheckedEvent($event: boolean) {
    /*     this.taskService.changeTaskState(this.id, $event);
     */
  }

  handleDeleteButtonClick() {
    /*     this.taskService.deleteTask(this.id);
     */
  }
  handleCopyToClickboardButtonClick() {
    /*     this.cbs.copyToClipboard(this.taskName);
     */
  }
  handleShareButtonClick() {
    /*     this.ss.shareText(this.id.toString());
     */
  }
}
