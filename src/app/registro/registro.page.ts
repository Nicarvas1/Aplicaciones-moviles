import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})

  export class RegistroPage {
    isDriver:boolean = false;
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
        modelo: '',
        asientos: '',
        patente: ''
      }
    };
  
    constructor() {}
  
    // Método para guardar los datos
    registrar() {
      // Validar que los datos del usuario estén completos
      if (this.usuario && this.usuario.nombre && this.usuario.apellido && this.usuario.email &&  this.usuario.clave && this.usuario.rut && this.usuario.carrera && this.usuario.direccion && this.usuario.telefono) {
        try {
          // Guardar los datos del usuario en localStorage
          localStorage.setItem('usuario', JSON.stringify(this.usuario));
          console.log('Datos guardados:', this.usuario);
        } catch (error) {
          console.error('Error al guardar los datos en localStorage:', error);
        }
      } else {
        console.error('Datos incompletos. Por favor, completa todos los campos.');
      }
    }
  }