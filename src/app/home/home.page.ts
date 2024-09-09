import { Component, OnInit } from '@angular/core';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  icono = 'oscuro'; // Inicialización del tema actual

  constructor(private anim: AnimationController) {}

  ngOnInit() {
    this.animarLogo(); // Animar el logo al iniciar el componente
  }

  cambiarTema() {
    // Cambia el tema y actualiza el ícono
    if (this.icono === 'oscuro') {
      document.documentElement.style.setProperty('--fondo', '#373737');
      document.documentElement.style.setProperty('--textos', '#898989');
      this.icono = 'claro';
    } else {
      document.documentElement.style.setProperty('--fondo', '#454E5F');
      document.documentElement.style.setProperty('--textos', '#ffffff');
      this.icono = 'oscuro';
    }
  }

  animarLogo() {
    // Crea y ejecuta la animación para el logo
    const logoElement = document.querySelector('#logo');
    if (logoElement) {
      this.anim.create()
        .addElement(logoElement)
        .duration(1000)
        .iterations(Infinity)
        .direction('alternate')
        .fromTo('color', 'red', 'blue')
        .fromTo('transform', 'scale(1)', 'scale(1.3)')
        .play();
    } else {
      console.error('No se encontró el elemento con id "logo"');
    }
  }

  animarError(index: number) {
    // Crea y ejecuta la animación de error para el campo de entrada especificado
    const inputElement = document.querySelectorAll('input')[index];
    if (inputElement) {
      this.anim.create()
        .addElement(inputElement)
        .duration(100)
        .iterations(3)
        .keyframes([
          { offset: 0, transform: 'translateX(0px)', border: '1px transparent solid' },
          { offset: 0.25, transform: 'translateX(-5px)', border: '1px red solid' },
          { offset: 0.50, transform: 'translateX(0px)', border: '1px transparent solid' },
          { offset: 0.75, transform: 'translateX(5px)', border: '1px red solid' },
          { offset: 1, transform: 'translateX(0px)', border: '1px transparent solid' }
        ])
        .onFinish(() => {
          console.log('La animación terminó!');
        })
        .play();
    } else {
      console.error(`No se encontró el input en el índice ${index}`);
    }
  }
}
