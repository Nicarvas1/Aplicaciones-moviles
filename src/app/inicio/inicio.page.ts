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
      document.documentElement.style.setProperty('--icono', '#ffffff');
      document.documentElement.style.setProperty('--fondo-cards', '#012C56');

      this.icono = 'claro';
    } else {
      document.documentElement.style.setProperty('--fondo', '#012C56');
      document.documentElement.style.setProperty('--icono', '#FFB71B');
      document.documentElement.style.setProperty('--fondo-cards', '#FFB71B');

      this.icono = 'oscuro';
    }
  }

  animarLogo(){
    this.anim.create()
    .addElement(document.querySelector("#logo")!)
    .duration(1000)
    .iterations(Infinity)
    .direction('alternate')
    .fromTo("color", "--icono", "--icono")
    .fromTo("transform","scale(1)", "scale(1.3)")
    .play()
  }

}
