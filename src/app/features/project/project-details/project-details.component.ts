import { Component, OnInit } from '@angular/core';
import { Project } from 'src/models/project/project';
import { Epic } from 'src/models/project/epic';
import { EpicService } from '../../epic/services/epic.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent implements OnInit {
  project!: Project;
  epicList: Epic[] = [];
  constructor(private epicService: EpicService) {}

  ngOnInit() {
    this.epicList = this.epicService.getEpics();
  }
}
