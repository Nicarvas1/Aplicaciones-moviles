import { Component, OnInit } from '@angular/core';
import { Animation, AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  

  constructor() { }

  icono = "oscuro"

  ngOnInit() {
    // Inicialización si es necesario
  }

  cambiarTema(){
    if(this.icono == "oscuro"){
      document.documentElement.style.setProperty("--fondo", "#262626")
      this.icono = "claro"
    }else{
      document.documentElement.style.setProperty("--fondo", "#012C56")
      this.icono = "oscuro"
    }
  }

  seleccionarPasajero() {
    console.log('Pasajero seleccionado');
    // Aquí puedes agregar la lógica para el botón Pasajero
  }

  seleccionarConductor() {
    console.log('Conductor seleccionado');
    // Aquí puedes agregar la lógica para el botón Conductor
  }
}
