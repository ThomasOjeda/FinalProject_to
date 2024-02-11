import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing/landing.component';
import { LandingContentComponent } from './landing-content/landing-content.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [LandingComponent, LandingContentComponent, MapComponent],
  imports: [CommonModule, RouterModule, SharedModule],
})
export class LandingModule {}
