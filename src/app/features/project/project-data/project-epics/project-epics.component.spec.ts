import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectEpicsComponent } from './project-epics.component';

describe('ProjectEpicsComponent', () => {
  let component: ProjectEpicsComponent;
  let fixture: ComponentFixture<ProjectEpicsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectEpicsComponent]
    });
    fixture = TestBed.createComponent(ProjectEpicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
