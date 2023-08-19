import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Task } from 'src/models/task';
import { AddTaskDialogService } from '../services/add-task-dialog.service';
import { ActivatedRoute } from '@angular/router';
import { StoryService } from '../../story/services/story.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  taskList: Task[] = [];
  taskCreationSubscription: Subscription = new Subscription();
  loadingTasks: boolean = true;
  errorFetchingTasks: boolean = false;
  constructor(
    private storyService: StoryService,
    private addTaskDialogService: AddTaskDialogService,
    private activatedRouteService: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.retrieveTaskList();
    this.taskCreationSubscription = this.addTaskDialogService
      .getTaskCreationEvent$()
      .subscribe(() => this.retrieveTaskList());
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
    this.addTaskDialogService.setState(true);
  }

  ngOnDestroy() {
    this.taskCreationSubscription.unsubscribe();
  }
}
