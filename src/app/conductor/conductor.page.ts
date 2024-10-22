import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

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

  constructor(private alertController: AlertController) {
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

  async registrarViaje() {
    if (!this.autoRegistrado) {
      await this.mostrarAlerta('Error', 'No se puede registrar el viaje porque no hay un auto registrado.');
      return;
    }
  
    let viajes = JSON.parse(localStorage.getItem('viajes') || '[]');
    viajes.push(this.viaje);
    localStorage.setItem('viajes', JSON.stringify(viajes));
  
    // Guardar en el historial
    const usuarioActualString = localStorage.getItem('usuarioActual');
    if (usuarioActualString) {
      const usuario = JSON.parse(usuarioActualString);
      let historial = JSON.parse(localStorage.getItem('historial') || '[]');
      historial.push({
        ...this.viaje,
        usuario: usuario.nombre,
        tipo: 'conductor',
        fechaPublicacion: new Date().toISOString(),
      });
      localStorage.setItem('historial', JSON.stringify(historial));
    }
  
    await this.mostrarAlerta('Éxito', 'El viaje ha sido registrado correctamente.');
    this.cargarDatosUsuario();
    this.viaje.salida = '';
    this.viaje.destino = '';
    this.viaje.horasalida = '';
    this.viaje.precio = 0;
  }
  
  // Método para mostrar alertas
  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }
}
