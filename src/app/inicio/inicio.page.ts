import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  selectedSeat: string | undefined;
  seats: string[] = ['1', '2', '3', '4'];
  users: { name: string; description: string; photoUrl: string; selectedSeat?: string }[] = [
    { name: 'Usuario 1', description: 'Descripción del Usuario 1', photoUrl: 'assets/user1.jpg' },
    { name: 'Usuario 2', description: 'Descripción del Usuario 2', photoUrl: 'assets/user2.jpg' }
  ];

  constructor() { }

  ngOnInit() {
    // Inicialización si es necesario
  }

  onSeatChange(event: any) {
    // Maneja el cambio de asiento
    console.log('Asiento seleccionado:', event.detail.value);
  }

  addUser() {
    // Lógica para agregar un nuevo usuario
    // Por ejemplo, puedes abrir un formulario para ingresar detalles del nuevo usuario
    console.log('Agregar usuario');
  }
}
