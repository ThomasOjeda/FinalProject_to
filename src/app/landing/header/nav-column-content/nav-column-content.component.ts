import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-nav-column-content',
  templateUrl: './nav-column-content.component.html',
  styleUrls: ['./nav-column-content.component.scss'],
})
export class NavColumnContentComponent {
  @Input() header!: string;
  @Input() elements!: string[];
  @Input() delay!: string;
}
