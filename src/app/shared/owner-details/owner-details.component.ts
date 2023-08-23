import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-owner-details',
  templateUrl: './owner-details.component.html',
  styleUrls: ['./owner-details.component.scss'],
})
export class OwnerDetailsComponent {
  @Input() ownerId!: string;
}
