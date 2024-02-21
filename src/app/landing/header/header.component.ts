import { Component, ViewChild, ViewContainerRef } from '@angular/core';
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

  @ViewChild('navContent', { read: ViewContainerRef })
  navContentContainer!: ViewContainerRef;
  mouseEnter(comp: any) {
    this.navContentContainer.createComponent(comp);
  }
}
