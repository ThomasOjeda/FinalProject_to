import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Task } from 'src/models/task';
import { ActivatedRoute } from '@angular/router';
import { StoryService } from '../../story/services/story.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  taskList: Task[] = [];
  loadingTasks: boolean = true;
  errorFetchingTasks: boolean = false;

  taskCreationDialogCommand: Subject<string> = new Subject<string>();
  constructor(
    private storyService: StoryService,
    private activatedRouteService: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.retrieveTaskList();
  }

  retrieveTaskList() {
    this.loadingTasks = true;
    this.errorFetchingTasks = false;

    let storyId = this.activatedRouteService.snapshot.paramMap.get('story-id');
    if (storyId) {
      this.storyService.getTasks$(storyId).subscribe({
        next: (tasks) => {
          this.taskList = tasks.data;
        },
        error: () => {
          this.errorFetchingTasks = true;
          this.loadingTasks = false;
        },
        complete: () => {
          this.loadingTasks = false;
        },
      });
    }
  }
  openAddTaskDialog() {
    this.taskCreationDialogCommand.next('open');
  }

  handleResultFromDialog(result: boolean) {
    if (result) this.retrieveTaskList();
  }
}
