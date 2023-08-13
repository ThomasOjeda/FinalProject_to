import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings/settings.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SettingsComponent],
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
})
export class SettingsModule {}
