import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MemberCardComponent } from './member-card.component';
import { DebugElement } from '@angular/core';
import { of } from 'rxjs';
import { UserService } from '../services/user.service';
import { UserResponse } from '../models/UserResponse';
import { By } from '@angular/platform-browser';
export interface User {
  name?: {
    first?: string;
    last?: string;
  };
  _id: string;
  email: string;
  username: string;
  __v?: 0;
}
describe('MemberCardComponent', () => {
  let component: MemberCardComponent;
  let fixture: ComponentFixture<MemberCardComponent>;
  let del: DebugElement;
  let userServiceSpy: any;

  beforeEach(waitForAsync(() => {
    userServiceSpy = jasmine.createSpyObj('userService', ['getUser$']);

    userServiceSpy.getUser$.and.returnValue(
      of<UserResponse>({
        status: 'validStatus',
        data: {
          name: { first: 'validfirst', last: 'validlast' },
          _id: 'validId',
          email: 'validEmail',
          username: 'validUsername',
        },
      })
    );

    TestBed.configureTestingModule({
      providers: [{ provide: UserService, useValue: userServiceSpy }],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(MemberCardComponent);
        component = fixture.componentInstance;
        del = fixture.debugElement;
      });
  }));

  it('Should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('Should display the correct member info', () => {
    fixture.detectChanges();

    const mainInfo = del.queryAll(By.css('.main-info'));

    expect(mainInfo.length)
      .withContext('Should only display one main info element')
      .toBe(1);

    expect(mainInfo[0].nativeElement.textContent)
      .withContext('Should display correct first and last name')
      .toBe('Validfirst Validlast');

    const secondaryInfo = del.queryAll(By.css('.secondary-info'));

    expect(secondaryInfo.length)
      .withContext('Should only display one secondary info element')
      .toBe(1);

    expect(secondaryInfo[0].nativeElement.textContent)
      .withContext('Should display correct first and last name')
      .toBe('validEmail');
  });
});
