import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular'; // Importa ModalController

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  isConductorMode: boolean = false; // Declaración correcta de la variable

  constructor(private router: Router, private modalController: ModalController) { }

  // Maneja el cambio en el ion-toggle
  toggleChange(event: any) {
    this.isConductorMode = event.detail.checked;
  }

  // Función para volver a la página anterior
  goBack() {
    this.router.navigate(['/']); // Navega a la ruta raíz, ajusta según tu estructura de rutas
  }

  // Función para cerrar el modal
  async closeModal() {
    const modal = await this.modalController.getTop(); // Obtén el modal activo
    if (modal) {
      await modal.dismiss(); // Cierra el modal
    }
  }

  ngOnInit() {
  }
}

