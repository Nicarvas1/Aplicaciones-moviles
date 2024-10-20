import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pasajero',
  templateUrl: './pasajero.page.html',
  styleUrls: ['./pasajero.page.scss'],
})
export class PasajeroPage implements OnInit, AfterViewInit {
  trips: any[] = []; // Propiedad para almacenar los viajes

  constructor() {}

  ngOnInit() {
    this.loadTrips(); // Cargar los viajes al iniciar la página
  }

  ngAfterViewInit() {}

  loadTrips() {
    const viajesString = localStorage.getItem('viajes');
    if (viajesString) {
      this.trips = JSON.parse(viajesString);
    } else {
      console.log('No hay viajes disponibles.');
    }
  }
  

  reservarViaje(trip: any) {
    if (trip.asiento > 0) {
      trip.asiento--; // Reduce el número de asientos disponibles
      localStorage.setItem('viajes', JSON.stringify(this.trips)); // Actualiza el localStorage
      alert('El viaje ha sido reservado correctamente.'); // Muestra la alerta
    } else {
      alert('No hay asientos disponibles.'); // Muestra alerta si no hay asientos
    }
    console.log('Viaje reservado:', trip);
  }
}