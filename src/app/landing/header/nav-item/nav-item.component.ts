import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  QueryList,
  Renderer2,
  ViewChildren,
} from '@angular/core';
import { NavColumnContentComponent } from '../nav-column-content/nav-column-content.component';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss'],
})
export class NavItemComponent implements AfterViewInit {
  @Input() animate!: boolean;
  exploreColumnElements = [
    'Explore All Mac',
    'MacBook Air',
    'MacBook Pro',
    'iMac',
    'Mac Mini',
    'Mac Studio',
    'Mac Pro',
    'Displays',
    'Chatarra cara',
    'Otras cosas',
    'Grandes inventos',
    'Pantallas overpriced',
    'Otros',
  ];

  orderOfAppearance: number[] = [1, 2, 3];

  @ViewChildren(NavColumnContentComponent, { read: ElementRef })
  columns!: QueryList<ElementRef>;

  constructor(private renderer2: Renderer2) {}

  ngAfterViewInit() {
    this.columns.forEach((col: ElementRef, index: number) => {
      this.renderer2.setProperty(
        col.nativeElement,
        'style',
        `--column-appearance-delay : ${240 + index * 32}ms`
      );
    });
  }
}
