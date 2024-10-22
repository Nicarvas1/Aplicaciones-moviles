import { Component, OnInit } from '@angular/core';
import { Animation, AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  icono = "oscuro";
  autoRegistrado: boolean = true; // Propiedad para controlar si hay un auto registrado

  constructor(private anim: AnimationController) {

  }

  ngOnInit() {
    this.animarLogo();
  }

  ionViewWillEnter() {
    this.cargarDatosUsuario(); // Cargar datos del usuario al inicializar
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

  animarLogo() {
    this.anim.create()
      .addElement(document.querySelector("#logo")!)
      .duration(1000)
      .iterations(Infinity)
      .direction('alternate')
      .fromTo("color", "--icono", "--icono")
      .fromTo("transform", "scale(1)", "scale(1.3)")
      .play();
  }

  cerrarSesion() {
    // Cerrar sesión
  }

  cargarDatosUsuario() {
    // Cargar los datos del usuario autenticado desde localStorage
    const usuarioActualString = localStorage.getItem('usuarioActual');
    if (usuarioActualString) {
      const usuario = JSON.parse(usuarioActualString);
      // Verificar si hay un auto registrado
      if(usuario.auto.marca === "" && usuario.auto.patente === "" && usuario.auto.modelo === "" ){
        this.autoRegistrado = false;
      }else{
        this.autoRegistrado = true
      }
    } else {
      console.error('No se encontró un usuario autenticado.');
    }
  }
}
