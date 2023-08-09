import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit, OnDestroy {
  isOpen: boolean = false;
  menuStateSubscription: Subscription = new Subscription();

  constructor(private menuService: MenuService) {}
  ngOnInit(): void {
    this.menuStateSubscription = this.menuService
      .getMenuState$()
      .subscribe((s) => (this.isOpen = s));
  }

  closeMenu() {
    this.menuService.closeMenu();
  }

  ngOnDestroy(): void {
    this.menuStateSubscription.unsubscribe();
  }
}
