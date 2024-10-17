import { HttpClient } from '@angular/common/http';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {
  // Propiedades de usuario
  icono = 'oscuro'; // Inicialización del tema actual
  isModalOpen = false;
  isConductorMode: boolean = false;

  email = '';
  clave = '';

  // Información del usuario
  nombreUsuario = '';
  rutUsuario = '';
  carreraUsuario = '';
  direccionUsuario = '';
  telefonoUsuario = '';

  // Información del conductor
  patenteConductor = '';
  marcaConductor = '';
  modeloConductor = '';
  destinoConductor = '';
  telefonoConductor = '';

  // Lista de usuarios predefinidos
  usuarios = [
    {
      nombre: "Juan Hernandez",
      clave: "juanito123",
      email: "juan@gmail.com"
    },
    {
      nombre: "Benjamin Casellas",
      clave: "casellas20",
      email: "b.casellas12@gmail.com"
    },
  ];

  constructor(
    private anim: AnimationController,
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private router: Router
  ) {}

  ngOnInit() {
    this.animarLogo(); // Animar el logo al iniciar el componente
  }

  ngAfterViewInit() {
    this.cargarDatosDelUsuario(); // Cargar datos del usuario desde localStorage
    this.cargarDatosDelConductor(); // Cargar datos del conductor desde localStorage
  }

  cargarDatosDelUsuario() {
    const usuarioString = localStorage.getItem('usuario');
    if (usuarioString) {
      const usuario = JSON.parse(usuarioString);
      this.nombreUsuario = usuario.nombre;
      this.rutUsuario = usuario.rut; 
      this.carreraUsuario = usuario.carrera;
      this.direccionUsuario = usuario.direccion;
      this.telefonoUsuario = usuario.telefono;
    }
  }

  cargarDatosDelConductor() {
    const conductorString = localStorage.getItem('conductor');
    if (conductorString) {
      const conductor = JSON.parse(conductorString);
      this.patenteConductor = conductor.patente;
      this.marcaConductor = conductor.marca; 
      this.modeloConductor = conductor.modelo;
      this.telefonoConductor = conductor.telefono;
      this.destinoConductor = conductor.destino;
    } else {
      // Inicializar datos de conductor si no existen
      this.inicializarConductor();
    }
  }

  inicializarConductor() {
    const conductor = {
      patente: "AB-1234",
      marca: "Toyota",
      modelo: "Sedan",
      telefono: "123456789",
      destino: "Hogwarts",
    };
    localStorage.setItem('conductor', JSON.stringify(conductor));
  }

  inicializarUsuario() {
    const usuario = {
      nombre: "Juan Hernandez",
      rut: "12.345.678-9",
      clave: "juanito123",
      email: "juan@gmail.com",
      carrera: "Ingeniería Civil Informática",
      direccion: "Calle Falsa 123",
      telefono: "123456789",
    };
    localStorage.setItem('usuario', JSON.stringify(usuario));
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

  animarLogo() {
    this.anim.create()
      .addElement(document.querySelector("#logo")!)
      .duration(1000)
      .iterations(Infinity)
      .direction('alternate')
      .fromTo("color", "#FFB71B", "#FFB71B")
      .fromTo("transform", "scale(1)", "scale(1.3)")
      .play();
  }

  async resetPass() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
    });

    await loading.present();

    const usuario = this.usuarios.find(u => u.email === this.email);
    if (usuario) {
      const nuevaClave = Math.random().toString(36).slice(-6);
      usuario.clave = nuevaClave;

      const body = {
        nombre: usuario.nombre,
        app: "Aplicaciones-moviles",
        clave: nuevaClave,
        email: usuario.email,
      };

      this.http.post("https://myths.cl/api/reset_password.php", body)
        .subscribe({
          next: (data) => {
            console.log(data);
          },
          error: (error) => {
            console.error("Error al restablecer la contraseña", error);
          },
          complete: () => {
            loading.dismiss();
          }
        });
    } else {
      console.log("Email no encontrado!");
      loading.dismiss();
    }
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  
  login() {
    const usuarioString = localStorage.getItem('usuario');
    if (usuarioString) {
      const usuario = JSON.parse(usuarioString);
      if (usuario.email === this.email && usuario.clave === this.clave) {
        console.log(`Bienvenido ${usuario.nombre}!`);
        this.router.navigate(['/inicio']);
      } else {
        console.error('Email o contraseña incorrectos.');
      }
    } else {
      console.error('No se encontró el usuario registrado.');
    }
  }

  animarError(index: number) {
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