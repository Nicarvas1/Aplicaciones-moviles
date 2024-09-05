import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  isConductorMode: boolean = false; // Declaración correcta de la variable

  constructor(private router: Router) { }

  // Maneja el cambio en el ion-toggle
  toggleChange(event: any) {
    this.isConductorMode = event.detail.checked;
  }

  // Función para volver a la página anterior
  goBack() {
    this.router.navigate(['/']); // Navega a la ruta raíz, ajusta según tu estructura de rutas
  }

  ngOnInit() {
  }
}
