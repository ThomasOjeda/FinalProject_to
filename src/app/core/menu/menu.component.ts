import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MenuService } from '../services/menu.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/auth/services/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit, OnDestroy {
  isOpen: boolean = false;
  menuStateSubscription: Subscription = new Subscription();

  mainElements = [
    { url: '/', name: 'Home', selected: false },
    { url: 'my-projects', name: 'My Projects', selected: false },
    { url: '/my-stories', name: 'My Stories', selected: false },
  ];

  footerElements = [{ url: '/settings', name: 'Settings', selected: false }];

  constructor(
    private menuService: MenuService,
    private routerService: Router,
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

  navigateMain(path: string, index: number) {
    this.clearAllSelections();
    this.mainElements[index].selected = true;
    this.closeMenu();
    this.routerService.navigate([path]);
  }

  navigateFooter(path: string, index: number) {
    this.clearAllSelections();
    this.footerElements[index].selected = true;
    this.closeMenu();
    this.routerService.navigate([path]);
  }

  clearAllSelections() {
    this.mainElements.forEach((element) => {
      element.selected = false;
    });
    this.footerElements.forEach((element) => {
      element.selected = false;
    });
  }

  handleLogoutButtonClick() {
    this.loginService.logout();
  }

  ngOnDestroy(): void {
    this.menuStateSubscription.unsubscribe();
  }
}
