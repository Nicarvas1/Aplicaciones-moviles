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
