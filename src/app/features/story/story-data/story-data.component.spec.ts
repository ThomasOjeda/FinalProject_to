import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryDataComponent } from './story-data.component';

describe('StoryDataComponent', () => {
  let component: StoryDataComponent;
  let fixture: ComponentFixture<StoryDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StoryDataComponent],
    });
    fixture = TestBed.createComponent(StoryDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
