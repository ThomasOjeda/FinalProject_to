import {
  ComponentFixture,
  TestBed,
  async,
  fakeAsync,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { ProjectEpicsComponent } from './project-epics.component';
import { DebugElement } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProjectService } from '../../services/project.service';
import { ActivatedRoute } from '@angular/router';
import { delay, mergeMap, of, throwError, timer } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('ProjectEpicsComponent', () => {
  let component: ProjectEpicsComponent;
  let fixture: ComponentFixture<ProjectEpicsComponent>;

  let debugElement: DebugElement;

  let projectServiceSpy: any;
  let activatedRouteServiceSpy: any;

  beforeEach(waitForAsync(() => {
    projectServiceSpy = jasmine.createSpyObj('projectService', ['getEpics$']);
    activatedRouteServiceSpy = {
      snapshot: {
        paramMap: jasmine.createSpyObj('paramMap', ['get']),
      },
    };

    TestBed.configureTestingModule({
      declarations: [ProjectEpicsComponent],
      imports: [SharedModule],
      providers: [
        { provide: ProjectService, useValue: projectServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteServiceSpy },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ProjectEpicsComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
      });
  }));

  it('Should create the component', () => {
    expect(component).withContext('Component was not created').toBeTruthy();
  });

  it('Should show a loading spinner while waiting for the epic data', fakeAsync(() => {
    activatedRouteServiceSpy.snapshot.paramMap.get.and.returnValue('validId');
    projectServiceSpy.getEpics$.and.returnValue(
      of({
        status: 'validStatus',
        data: [
          {
            _id: 'validId',
            project: 'validProject',
            name: 'validName',
            description: 'validDescription',
            icon: 'validIcon',
          },
        ],
      }).pipe(delay(100))
    );

    fixture.detectChanges(); // Its important to detect after the spies have been configured, because if you do it before, ngOnInit fires and finds some values undefined.

    let spinner = debugElement.query(By.css('app-loading-spinner'));

    expect(spinner)
      .withContext('Should display a loading spinner')
      .toBeTruthy();

    const epicList = debugElement.query(By.css('.epic-list'));

    expect(epicList).withContext('Should not be present').toBeFalsy();

    tick(100);

    fixture.detectChanges();

    spinner = debugElement.query(By.css('app-loading-spinner'));

    expect(spinner)
      .withContext('The spinner should disappear after the data is fetched')
      .toBeFalsy();

    const epics = debugElement.queryAll(By.css('app-summary-card'));

    expect(epics.length).withContext('Should display one epic').toBe(1);
  }));

  it('Should show an error alert if there was an error fetching the epic data', fakeAsync(() => {
    activatedRouteServiceSpy.snapshot.paramMap.get.and.returnValue('validId');
    projectServiceSpy.getEpics$.and.returnValue(
      timer(100).pipe(
        mergeMap(() => {
          return throwError(() => {
            return {
              error: 'there was an eror',
            };
          });
        })
      )
    );

    fixture.detectChanges();

    let spinner = debugElement.query(By.css('app-loading-spinner'));

    expect(spinner)
      .withContext('Should display a loading spinner')
      .toBeTruthy();

    tick(100);

    fixture.detectChanges();

    spinner = debugElement.query(By.css('app-loading-spinner'));

    expect(spinner)
      .withContext('The spinner should disappear after the data is fetched')
      .toBeFalsy();

    const errorAlert = debugElement.query(
      By.css('app-alert-message.error-alert')
    );

    expect(errorAlert)
      .withContext('The error alert should appear after the error is thrown')
      .toBeTruthy();
  }));

  it('Should show a warning alert when there are 0 epics available', () => {
    activatedRouteServiceSpy.snapshot.paramMap.get.and.returnValue('validId');
    projectServiceSpy.getEpics$.and.returnValue(
      of({
        status: 'validStatus',
        data: [],
      })
    );

    fixture.detectChanges();

    const noEpicsAlert = debugElement.query(By.css('.no-epics-alert'));

    expect(noEpicsAlert).withContext('Should be present').toBeTruthy();
  });
});

//Falta testear cuando no hay epicas, y cuando hay varias epicas que haya esa misma cantidad den la lista
