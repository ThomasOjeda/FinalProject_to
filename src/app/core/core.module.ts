import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HeaderComponent, MenuComponent, LayoutComponent],
  imports: [CommonModule, FormsModule, RouterModule, SharedModule],
  exports: [HeaderComponent],
})
export class CoreModule {}
