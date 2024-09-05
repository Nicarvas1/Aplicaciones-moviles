import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  constructor(private router: Router) { }
  goBack() {
    this.router.navigate(['/']); // Navega a la ruta raíz, ajusta según tu estructura de rutas
  }
  ngOnInit() {
  }

  
}
