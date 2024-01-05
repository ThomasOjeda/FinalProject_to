import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MemberListComponent } from './member-list.component';
import { SharedModule } from '../shared.module';
import { DebugElement } from '@angular/core';
import { UserService } from '../user/services/user.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('ProjectEpicsComponent', () => {
  let component: MemberListComponent;

  let fixture: ComponentFixture<MemberListComponent>;

  let del: DebugElement;

  let userServiceSpy: any;

  beforeEach(waitForAsync(() => {
    userServiceSpy = jasmine.createSpyObj('userService', ['getUser$']);
    userServiceSpy.getUser$.and.returnValue(of({}));

    TestBed.configureTestingModule({
      imports: [SharedModule],
      providers: [{ provide: UserService, useValue: userServiceSpy }],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(MemberListComponent);
        component = fixture.componentInstance;
        del = fixture.debugElement;
      });
  }));

  it('Should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('Should display the member list', () => {
    component.memberIdList = ['test', 'test'];

    fixture.detectChanges();

    const memberCards = del.queryAll(By.css('app-member-card'));

    expect(memberCards.length)
      .withContext('Cards should get displayed')
      .toBeGreaterThan(0);
    expect(memberCards.length).withContext('Should display 2 cards').toBe(2);
  });
});
