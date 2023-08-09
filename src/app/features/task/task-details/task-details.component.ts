import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from 'src/models/task';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
})
export class TaskDetailsComponent implements OnInit {
  task!: Task;

  constructor(private ar: ActivatedRoute, private taskService: TaskService) {}

  ngOnInit() {
    let taskId = this.ar.snapshot.paramMap.get('task-id');
    /*     if (taskId) this.task = this.taskService.getTask(taskId as unknown as number);
     */
  }
}
