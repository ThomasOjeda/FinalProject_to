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

  navigate(path: string) {
    this.closeMenu();
    this.routerService.navigate([path]);
  }

  handleLogoutButtonClick() {
    this.loginService.logout();
  }

  ngOnDestroy(): void {
    this.menuStateSubscription.unsubscribe();
  }
}
