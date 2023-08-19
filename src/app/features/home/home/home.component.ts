import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

import {
  map,
  fromEvent,
  startWith,
  debounceTime,
  distinctUntilChanged,
  Subscription,
} from 'rxjs';
import { SearchService } from '../services/search.service';
import { Project } from 'src/models/project';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('searchInput') searchInput!: ElementRef;

  search: string = '';
  searchType!: string;
  searchInputSubscription: Subscription = new Subscription();
  searchServiceSubscription: Subscription = new Subscription();

  searchResults: {
    type: number;
    data: { _id: string; name: string; description: string };
  }[] = [];

  proyres: Project[] = [];

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.searchInputSubscription = fromEvent<KeyboardEvent>(
      this.searchInput.nativeElement,
      'keyup'
    )
      .pipe(
        map((event) => {
          if (event.target) return (event.target as HTMLInputElement).value;
          return '';
        }),
        startWith(''),
        debounceTime(600),
        distinctUntilChanged()
      )
      .subscribe((value) => this.searchFor(value));
  }

  handleSelectorChanged() {
    this.searchFor(this.search);
  }

  searchFor(value: string) {
    this.searchResults = [];
    this.searchServiceSubscription.unsubscribe();
    this.searchServiceSubscription = this.searchService
      .search(value, this.searchType)
      .subscribe((results) => (this.searchResults = results));
  }

  ngOnDestroy(): void {
    this.searchInputSubscription.unsubscribe();
    this.searchServiceSubscription.unsubscribe();
  }
}
