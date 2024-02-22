import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { NavItemComponent } from './nav-item/nav-item.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  menuElements: any[] = [
    { title: 'Store', component: NavItemComponent },
    { title: 'Mac', component: NavItemComponent },
  ];

  @ViewChild('nav', { read: ElementRef }) nav!: ElementRef;
  @ViewChild('navContent', { read: ElementRef }) navContent!: ElementRef;
  @ViewChild('navContentContainer', { read: ViewContainerRef })
  navContentContainer!: ViewContainerRef;

  isHeaderOpen = false;
  constructor(private renderer2: Renderer2) {}

  mouseEnterNavItem(comp: any) {
    this.isHeaderOpen = true;
    if (this.navContentContainer.length <= 0) {
      this.navContentContainer.createComponent(comp);
    }
  }

  mouseLeaveNavContent() {
    this.isHeaderOpen = false;
    this.navContentContainer.clear();
  }

  ngAfterViewChecked() {
    if (!this.isHeaderOpen) {
      this.renderer2.removeClass(this.nav.nativeElement, 'open');
      this.renderer2.removeStyle(this.nav.nativeElement, 'height');
      this.renderer2.removeClass(this.navContent.nativeElement, 'visible');
    } else {
      this.renderer2.addClass(this.nav.nativeElement, 'open');
      this.renderer2.addClass(this.navContent.nativeElement, 'visible');

      this.renderer2.setStyle(
        this.nav.nativeElement,
        'height',
        this.nav.nativeElement.scrollHeight + 'px'
      );
    }
  }
}
