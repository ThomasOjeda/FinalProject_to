import { HttpClient } from '@angular/common/http';
import { Component, NgZone, ViewEncapsulation } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MapComponent {
  map!: L.Map;

  points!: L.GeoJSON;

  constructor(private ngZone: NgZone, private httpClient: HttpClient) {}
  ngOnInit() {
    this.ngZone.runOutsideAngular(() => {
      this.map = L.map('argentina-map', { zoomSnap: 0.25 });
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.map);
      const icon = L.icon({
        iconUrl: '/assets/marker-pin-04-svgrepo-com.svg',
        iconSize: [35, 35],
        className: 'icon',
      });

      const pointIcon = L.icon({
        iconUrl: '/assets/marker-stroked-svgrepo-com.svg',
        iconSize: [25, 25],
        iconAnchor: [12.5, 24],
        className: 'point-icon',
      });

      const popup = L.popup().setContent(
        '<img src="https://upload.wikimedia.org/wikipedia/commons/0/06/Mickey_mouse.svg" width="50" height="50">'
      );

      L.marker(
        { lat: -37.32049794438222, lng: -59.13281541153424 },
        {
          icon: icon,
        }
      )
        .bindPopup(popup)
        .addTo(this.map);

      this.httpClient
        .get('assets/mapdata/puntos.json')
        .subscribe((puntosGeoJSON) => {
          this.points = L.geoJSON(puntosGeoJSON as GeoJSON.GeoJsonObject, {
            pointToLayer: (feature, latlng) => {
              return L.marker(latlng, { icon: pointIcon }).bindPopup(
                feature.properties.fna
              );
            },
          }).addTo(this.map);
          this.map.fitBounds(this.points.getBounds(), {
            paddingTopLeft: [500, 0],
          });
        });

      this.httpClient
        .get('assets/mapdata/provincias.json')
        .subscribe((provinciasGeoJSON) => {
          L.geoJSON(provinciasGeoJSON as GeoJSON.GeoJsonObject, {
            style: (feature) => {
              if (feature?.properties.fna == 'Provincia de Buenos Aires')
                return { color: '#3a5e3b', fillOpacity: 0 };
              else return { fillOpacity: 0 };
            },
            onEachFeature: (feature, layer) => {
              layer.bindTooltip(feature.properties.fna);
            },
          }).addTo(this.map);
        });
      this.map.on('click', (event) => {
        //this.map.setView(event.latlng);
        console.log(event);
      });

      L.circle([-37.32049794438222, -59.13281541153424], {
        radius: 50,
      }).addTo(this.map);
      /*       setInterval(() => {
        if (this.map.hasLayer(this.points)) this.map.removeLayer(this.points);
        else this.map.addLayer(this.points);
      }, 2000); */
    });
  }
}
