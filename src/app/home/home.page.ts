import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  icono = "oscuro"

  constructor() {}

  cambiarTema(){
    if(this.icono == "oscuro"){
      document.documentElement.style.setProperty("--fondo", "#262626")
      this.icono = "claro"
    }else{
      document.documentElement.style.setProperty("--fondo", "#012C56")
      this.icono = "oscuro"
    }
  }

}
