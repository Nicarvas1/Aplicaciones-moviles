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
    const conductorString = localStorage.getItem('conductor');
    if (conductorString) {
      const conductor = JSON.parse(conductorString);
      this.conductorViaje = conductor.conductor;
      this.salidaViaje = conductor.salida; 
      this.destinoViaje = conductor.destino;
      this.asientosViaje = conductor.asientoDisponible;
      this.horasalidaViaje = conductor.horasalida;
      this.precioViaje = conductor.precio;
      this.licensePlate = conductor.licensePlate; // Asignar la placa del vehículo
      this.model = conductor.model; // Asignar el modelo del vehículo
    }
  }

  private loadTrips() {
    // Aquí puedes cargar los viajes desde una fuente de datos, por ejemplo, localStorage o una API
    const tripsString = localStorage.getItem('trips');
    if (tripsString) {
      this.trips = JSON.parse(tripsString);
    } else {
      // Ejemplo de datos de viajes
      this.trips = [
        { id: 1, model: 'Toyota Corolla', licensePlate: 'ABC123', conductor: 'Juan Hernadez', salida: '10:00 AM', destino: 'Ciudad A', asientos: 3, precio: 1000 },
        { id: 2, model: 'Honda Civic', licensePlate: 'XYZ789', conductor: 'Pedro Sanchez', salida: '11:00 AM', destino: 'Ciudad B', asientos: 2, precio: 1500 },
      ];
    }   
  }

  addTrip(newTrip: any) {
    this.trips.push(newTrip); // Agregar un nuevo viaje a la lista de viajes
    localStorage.setItem('trips', JSON.stringify(this.trips)); // Guardar la lista actualizada de viajes en localStorage
  }
}