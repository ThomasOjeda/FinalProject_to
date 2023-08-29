import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpicStoriesComponent } from './epic-stories.component';

describe('EpicStoriesComponent', () => {
  let component: EpicStoriesComponent;
  let fixture: ComponentFixture<EpicStoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EpicStoriesComponent]
    });
    fixture = TestBed.createComponent(EpicStoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
