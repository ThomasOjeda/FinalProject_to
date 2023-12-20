import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MenuService } from '../services/menu.service';
import { LoginService } from 'src/app/auth/services/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit, OnDestroy {
  isOpen = false;
  menuStateSubscription: Subscription = new Subscription();

  mainElements = [
    { url: '/home', name: 'Home' },
    { url: 'my-projects', name: 'My Projects' },
    { url: '/my-stories', name: 'My Stories' },
  ];

  footerElements = [{ url: '/settings', name: 'Settings', selected: false }];

  constructor(
    private menuService: MenuService,
    private loginService: LoginService
  ) {}
  ngOnInit(): void {
    this.menuStateSubscription = this.menuService
      .getMenuState$()
      .subscribe((s) => (this.isOpen = s));
  }

  closeMenu() {
    this.menuService.closeMenu();
  }

  handleLogoutButtonClick() {
    this.loginService.logout();
  }

  ngOnDestroy(): void {
    this.menuStateSubscription.unsubscribe();
  }
}
