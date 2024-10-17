import { Component } from '@angular/core';

@Component({
  selector: 'app-conductor',
  templateUrl: './conductor.page.html',
  styleUrls: ['./conductor.page.scss'],
})
export class ConductorPage {
  conductor = {
    nombre: '',
    patente: '',
    marca: '',
    modelo: '',
    telefono: '',
    salida: '',
    destino: '',
    horasalida: '',
    asiento:  null,
    precio: null,
  };

  constructor() {}

  registrarConductor() {
    if (this.conductor.nombre && this.conductor.patente && this.conductor.marca && this.conductor.modelo && this.conductor.telefono && this.conductor.destino && this.conductor.asiento !== null && this.conductor.precio !== null && this.conductor.horasalida && this.conductor.salida) {
      localStorage.setItem('conductor', JSON.stringify(this.conductor));
      console.log('Datos del conductor guardados:', this.conductor);
    } else {
      console.error('Por favor, completa todos los campos.');
    }
  }
}