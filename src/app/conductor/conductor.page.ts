import { Component } from '@angular/core';

@Component({
  selector: 'app-conductor',
  templateUrl: './conductor.page.html',
  styleUrls: ['./conductor.page.scss'],
})
export class ConductorPage {
  viaje = {
    nombre: '',
    patente: '',
    marca: '',
    modelo: '',
    telefono: '',
    salida: '',
    destino: '',
    horasalida: '',
    asiento: 0,
    precio: 0
  };

  autoRegistrado: boolean = true; // Propiedad para controlar si hay un auto registrado

  constructor() {
    this.cargarDatosUsuario();
  }

  cargarDatosUsuario() {
    // Cargar los datos del usuario autenticado desde localStorage
    const usuarioActualString = localStorage.getItem('usuarioActual');
    if (usuarioActualString) {
      const usuario = JSON.parse(usuarioActualString);
      // Rellenar los campos del viaje con los datos del usuario
      this.viaje.nombre = `${usuario.nombre} ${usuario.apellido}`;
      this.viaje.patente = usuario.auto?.patente || '';
      this.viaje.marca = usuario.auto?.marca || '';
      this.viaje.modelo = usuario.auto?.modelo || '';
      this.viaje.telefono = usuario.telefono;
      this.viaje.asiento = parseInt(usuario.auto?.asientos || '0', 10) - 1 || 0;

      // Verificar si los datos del auto están vacíos
      if (!this.viaje.patente || !this.viaje.marca || !this.viaje.modelo || this.viaje.asiento <= 0) {
        this.viaje.patente = "No existe un auto registrado";
        this.viaje.marca = "No existe un auto registrado";
        this.viaje.modelo = "No existe un auto registrado";
        this.viaje.asiento = 0;
        this.autoRegistrado = false; // Cambiar el estado del auto a no registrado
      } else {
        this.autoRegistrado = true; // Hay un auto registrado
      }
    } else {
      console.error('No se encontró un usuario autenticado.');
    }
  }

  registrarViaje() {
    // Verificar si hay un auto registrado antes de registrar el viaje
    if (!this.autoRegistrado) {
      alert('No se puede registrar el viaje porque no hay un auto registrado.');
      return;
    }

    // Obtener los viajes almacenados en localStorage
    let viajes = JSON.parse(localStorage.getItem('viajes') || '[]');
    // Agregar el nuevo viaje a la lista
    viajes.push(this.viaje);
    // Guardar la lista actualizada en localStorage
    localStorage.setItem('viajes', JSON.stringify(viajes));
    // Mostrar mensaje de confirmación
    alert('El viaje ha sido registrado correctamente');
    // Reiniciar el objeto viaje, manteniendo los datos del usuario
    this.cargarDatosUsuario();
    this.viaje.salida = '';
    this.viaje.destino = '';
    this.viaje.horasalida = '';
    this.viaje.precio = 0;
  }
}
