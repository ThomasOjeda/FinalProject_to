import {
  AfterViewChecked,
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
export class HeaderComponent implements AfterViewChecked {
  menuElements: { title: string; component: any }[] = [
    { title: 'Store', component: NavItemComponent },
    { title: 'Mac', component: NavItemComponent },
  ];

  currentSubmenu: string | null = null;
  @ViewChild('nav', { read: ElementRef }) nav!: ElementRef;
  @ViewChild('navContent', { read: ElementRef }) navContent!: ElementRef;
  @ViewChild('navContentContainer', { read: ViewContainerRef })
  navContentContainer!: ViewContainerRef;

  isHeaderOpen = false;
  constructor(private renderer2: Renderer2) {}

  mouseEnterNavItem(compName: string, comp: any) {
    if (compName != this.currentSubmenu || !this.isHeaderOpen) {
      this.currentSubmenu = compName;
      if (this.navContentContainer.length > 0) this.navContentContainer.clear();
      const newlyCreated = this.navContentContainer.createComponent(comp);
      if (this.isHeaderOpen) {
        newlyCreated.setInput('animate', false);
        console.log(newlyCreated.location.nativeElement);
      } else newlyCreated.setInput('animate', true);
    }
    this.isHeaderOpen = true;
  }

  mouseLeaveNavContent() {
    this.isHeaderOpen = false;
  }

  ngAfterViewChecked() {
    this.adjustHeader();
  }

  adjustHeader() {
    if (this.isHeaderOpen) {
      this.renderer2.setStyle(
        this.nav.nativeElement,
        'height',
        this.nav.nativeElement.scrollHeight + 'px'
      );
      this.renderer2.addClass(this.nav.nativeElement, 'open');
      this.renderer2.removeClass(
        this.navContent.nativeElement,
        'animatedClose'
      );
      this.renderer2.addClass(this.navContent.nativeElement, 'animatedOpen');
    } else {
      this.renderer2.removeStyle(this.nav.nativeElement, 'height');
      this.renderer2.removeClass(this.nav.nativeElement, 'open');
      this.renderer2.removeClass(this.navContent.nativeElement, 'animatedOpen');
      this.renderer2.addClass(this.navContent.nativeElement, 'animatedClose');
    }
  }

  onAnimationFinished($event: AnimationEvent) {
    if ($event.animationName.includes('slowlyGoBack')) {
      this.navContentContainer.clear();
    }
  }
}
