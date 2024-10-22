import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-pasajero',
  templateUrl: './pasajero.page.html',
  styleUrls: ['./pasajero.page.scss'],
})
export class PasajeroPage implements OnInit, AfterViewInit {
  trips: any[] = []; // Propiedad para almacenar los viajes

  constructor(private alertController: AlertController) {}

  ngOnInit() {
    this.loadTrips(); // Cargar los viajes al iniciar la página
  }

  ngAfterViewInit() {}

  /**
   * Carga los viajes desde el localStorage y filtra los viajes para que solo se muestren
   * los de conductores con nombre diferente al usuario logeado.
   */
  loadTrips() {
    const viajesString = localStorage.getItem('viajes');
    const usuarioActualString = localStorage.getItem('usuarioActual');
    
    if (viajesString && usuarioActualString) {
      const usuario = JSON.parse(usuarioActualString);
      const nombreCompletoUsuario = `${usuario.nombre} ${usuario.apellido}`;
      const allTrips = JSON.parse(viajesString);
      
      // Filtrar los viajes para que solo se muestren los de conductores con nombre diferente al usuario logeado
      this.trips = allTrips.filter((trip: any) => trip.nombre !== nombreCompletoUsuario);
    } else {
      console.log('No hay viajes disponibles o no hay usuario logeado.');
    }
  }
  
  /**
   * Reserva un viaje para el usuario logeado reduciendo los asientos disponibles y actualizando el localStorage.
   * También guarda la reserva en el historial del usuario.
   * 
   * @param {any} trip - El viaje a reservar.
   */
  async reservarViaje(trip: any) {
    if (trip.asiento > 0) {
      trip.asiento--; // Reduce el número de asientos disponibles
      localStorage.setItem('viajes', JSON.stringify(this.trips)); // Actualiza el localStorage
  
      // Guardar en el historial
      const usuarioActualString = localStorage.getItem('usuarioActual');
      if (usuarioActualString) {
        const usuario = JSON.parse(usuarioActualString);
        let historial = JSON.parse(localStorage.getItem('historial') || '[]');
        historial.push({
          ...trip,
          usuario: usuario.nombre,
          tipo: 'pasajero',
          fechaReserva: new Date().toISOString(),
        });
        localStorage.setItem('historial', JSON.stringify(historial));
      }
  
      await this.mostrarAlerta('Éxito', 'El viaje ha sido reservado correctamente.');
    } else {
      await this.mostrarAlerta('Advertencia', 'No hay asientos disponibles.');
    }
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
