import { Component, NgZone, ViewEncapsulation } from '@angular/core';
import * as L from 'leaflet';
import { puntosGeoJSON } from 'src/mapdata/puntos';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MapComponent {
  map: any;

  constructor(private ngZone: NgZone) {}
  ngOnInit() {
    this.ngZone.runOutsideAngular(() => {
      this.map = L.map('argentina-map', {}).setView(
        [-35.027566129999968, -58.666461475999938],
        5
      );
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.map);

      L.geoJSON(puntosGeoJSON as GeoJSON.GeoJsonObject).addTo(this.map);
    });
  }
}
