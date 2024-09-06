import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pasajero',
  templateUrl: './pasajero.page.html',
  styleUrls: ['./pasajero.page.scss'],
})
export class PasajeroPage implements OnInit {


  trips = [
    {
      model: 'Toyota Corolla',
      licensePlate: 'ABC123',
      driverName: 'Juan Pérez',
      startLocation: 'Calle Falsa 123',
      endLocation: 'Avenida Siempre Viva 742',
      seats: 3,
      price: 150,
      departureTime: '08:30'
    },
    {
      model: 'Honda Civic',
      licensePlate: 'XYZ789',
      driverName: 'María Gómez',
      startLocation: 'Plaza Mayor',
      endLocation: 'Estación Central',
      seats: 2,
      price: 200,
      departureTime: '08:30'
    }
  ];
  
  constructor() { }

  ngOnInit() {
  }

}
