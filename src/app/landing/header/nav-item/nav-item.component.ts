import {
  Component,
  ElementRef,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { NavItem } from '../NavItem';
import { NavColumnContentComponent } from '../nav-column-content/nav-column-content.component';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss'],
})
export class NavItemComponent implements NavItem {
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
    console.log(this.columns);

    this.columns.forEach((col: ElementRef, index: number) => {
      console.log(col);
      this.renderer2.setProperty(
        col.nativeElement,
        'style',
        `--order-app:${this.orderOfAppearance[index]};`
      );
    });
  }
}
