import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  isDriver: boolean = false;

  // Definir un objeto para almacenar los datos del formulario
  usuario = {
    nombre: '',
    apellido: '',
    email: '',
    clave: '',
    region: '',
    sede: '',
    rut: "",
    carrera: "",
    direccion: "",
    telefono: "",
    isDriver: false,
    auto: {
      marca: '',
      modelo: '',
      asientos: 0,
      patente: ''
    }
  };

  constructor(private router: Router, private alertController: AlertController) {}

  // Método para mostrar alertas
  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

  // Método para guardar los datos
  async registrar() {
    // Validar que los datos del usuario estén completos
    if (this.usuario && this.usuario.nombre && this.usuario.apellido && this.usuario.email && this.usuario.clave && this.usuario.rut && this.usuario.carrera && this.usuario.direccion && this.usuario.telefono) {
      try {
        // Obtener la lista de usuarios guardados en localStorage
        let usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

        // Agregar el nuevo usuario al arreglo de usuarios
        usuarios.push(this.usuario);

        // Guardar la lista de usuarios actualizada en localStorage
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        console.log('Datos guardados:', this.usuario);

        // Mostrar alerta de éxito
        await this.mostrarAlerta('Éxito', 'Registro realizado correctamente!.');
        this.router.navigate(['/home']);

      } catch (error) {
        console.error('Error al guardar los datos en localStorage:', error);
        await this.mostrarAlerta('Error', 'Hubo un problema al guardar los datos.');
      }
    } else {
      console.error('Datos incompletos. Por favor, completa todos los campos.');
      await this.mostrarAlerta('Advertencia', 'Datos incompletos. Por favor, completa todos los campos.');
    }
  }
}
