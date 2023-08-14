import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-details',
  templateUrl: './custom-details.component.html',
  styleUrls: ['./custom-details.component.scss'],
})
export class CustomDetailsComponent {
  @Input() rowNames: (string | undefined)[] = [];
  @Input() rowValues: (string | undefined)[] = [];
  @Input() states: (boolean | undefined)[] = [];

  constructor() {
    this.rowNames = ['Unorow', 'dosrow'];
    this.rowValues = ['Unorow', 'dosrow'];
    this.states = new Array(this.rowNames.length).fill(false);
  }

  handleButtonClickedEvent(index: number) {
    this.states[index] = !this.states[index];
  }
}
