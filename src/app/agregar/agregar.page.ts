import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage {
  conductor = {
    name: '',
    description: '',
    photoUrl: '',
    preferredSeat: ''
  };

  seats: string[] = ['1', '2', '3', '4'];

  constructor(private router: Router) { }

  onSubmit() {
    // Aquí puedes enviar los datos a un servicio o API
    console.log('Conductor Agregado:', this.conductor);
    // Redirige a otra página o muestra un mensaje de éxito
    this.router.navigate(['/']); // Redirige a la página principal
  }
}


