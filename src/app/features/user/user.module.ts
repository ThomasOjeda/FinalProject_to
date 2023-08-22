import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberCardComponent } from './member-card/member-card.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [MemberCardComponent],
  imports: [CommonModule, SharedModule],
  exports: [MemberCardComponent],
})
export class UserModule {}
