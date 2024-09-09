import { Component, OnInit } from '@angular/core';
import { Animation, AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  

  constructor(private anim: AnimationController) { }

  icono = "oscuro"

  ngOnInit() {
    this.animarLogo();// Inicialización si es necesario
  }

  

  cambiarTema() {
    // Cambia el tema y actualiza el ícono
    if (this.icono === 'oscuro') {
      document.documentElement.style.setProperty('--fondo', '#373737');
  
      this.icono = 'claro';
    } else {
      document.documentElement.style.setProperty('--fondo', '#012C56');

      this.icono = 'oscuro';
    }
  }

  animarLogo(){
    this.anim.create()
    .addElement(document.querySelector("#logo")!)
    .duration(1000)
    .iterations(Infinity)
    .direction('alternate')
    .fromTo("color", "#FFB71B", "#FFB71B")
    .fromTo("transform","scale(1)", "scale(1.3)")
    .play()
  }

}
