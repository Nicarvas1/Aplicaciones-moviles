import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  icono = 'oscuro'; // Inicialización del tema actual
  isModalOpen = false;
  usuarios = [
    {
      nombre: "Juan Hernandez",
      clave: "juanito123",
      email: "juan@gmail.com"
    },
    {
      nombre: "benjamin casellas",
      clave: "casellas20",
      email: "b.casellas12@gmail.com"
    },
  ]

  constructor(private anim: AnimationController, private http: HttpClient,
    private loadingCtrl: LoadingController,private router: Router) {}
    
    async resetPass() {
      const loading = await this.loadingCtrl.create({
        message: 'Cargando...',
      });
      for (let u of this.usuarios) {
        if (u.email == this.email) {
          loading.present()
          let nueva = Math.random().toString(36).slice(-6)
          u.clave = nueva
          let body = {
            "nombre": u.nombre,
            "app": "Aplicaciones-moviles",
            "clave": nueva,
            "email": u.email
          }        
          this.http.post("https://myths.cl/api/reset_password.php", body)
          .subscribe((data)=>{
            loading.dismiss()
            console.log(data)
          })
          return;
        }
      }
      loading.dismiss()
    }
    setOpen(isOpen: boolean) {
      this.isModalOpen = isOpen;
    }
  
    email = ""
    clave = ""
  
    login() {
      let usuarioEncontrado = false;
      let claveCorrecta = false;
    
      for (let u of this.usuarios) {
        if (u.email == this.email) {
          usuarioEncontrado = true;
          if (u.clave == this.clave) {
            claveCorrecta = true;
            console.log(`Bienvenido ${u.nombre}!.`);
            this.router.navigate(['/inicio']);
            return;
          }
        }
      }
    
      if (!usuarioEncontrado) {
        console.log("Nombre de usuario incorrecto!.");
      } else if (!claveCorrecta) {
        console.log("Contraseña incorrecta!.");
      }
    }
  
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
