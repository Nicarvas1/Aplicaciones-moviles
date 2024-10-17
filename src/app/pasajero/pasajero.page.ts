import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pasajero',
  templateUrl: './pasajero.page.html',
  styleUrls: ['./pasajero.page.scss'],
})
export class PasajeroPage implements OnInit, AfterViewInit {
  isConductorMode: boolean = false;
  conductorViaje: string = '';
  salidaViaje: string = '';
  destinoViaje: string = '';
  asientosViaje: string = '';
  horasalidaViaje: string = '';
  precioViaje: string = '';
  licensePlate: string = ''; // Propiedad para almacenar la placa del vehículo
  model: string = ''; // Propiedad para almacenar el modelo del vehículo
  trips: any[] = []; // Definir la propiedad trips para almacenar los viajes

  constructor() {}

  ngOnInit() {
    this.loadConductorData(); // Cargar datos del conductor al iniciar el componente
    this.loadTrips(); // Cargar los viajes al iniciar el componente
  }

  ngAfterViewInit() {}

  private loadConductorData() {
    console.log('loadConductorData llamado');
    const conductorString = localStorage.getItem('conductor');
    if (conductorString) {
      const conductor = JSON.parse(conductorString);
      console.log('Datos del conductor:', conductor);
      this.conductorViaje = conductor.nombre;
      this.salidaViaje = conductor.salida;
      this.destinoViaje = conductor.destino;
      this.asientosViaje = conductor.asiento;
      this.horasalidaViaje = conductor.horasalida;
      this.precioViaje = conductor.precio;
      this.licensePlate = conductor.patente;
      this.model = conductor.modelo;
    }
  }

  private loadTrips() {
    const tripsString = localStorage.getItem('trips');
    if (tripsString) {
      this.trips = JSON.parse(tripsString);
    } else {
      this.trips = [];
    }
  }

  addNewTrip() {
    const newTrip = {
      id: this.trips.length + 1,
      model: this.model,
      licensePlate: this.licensePlate,
      conductor: this.conductorViaje,
      salida: this.salidaViaje,
      destino: this.destinoViaje,
      asientos: this.asientosViaje,
      precio: this.precioViaje,
    };
    this.trips.push(newTrip);
    localStorage.setItem('trips', JSON.stringify(this.trips));
    console.log('Nuevo viaje agregado:', newTrip);
  }

  eliminarViaje(index: number) {
    this.trips.splice(index, 1);
    localStorage.setItem('trips', JSON.stringify(this.trips));
    console.log('Viaje eliminado:', index);
  }

  reservarViaje(trip: any) {
    // Implementa la lógica para reservar un viaje
    console.log('Viaje reservado:', trip);
  }
}