import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, AnimationController, IonModal } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements AfterViewInit {
  @ViewChild('modal', { static: false }) modal: IonModal | undefined;
  isConductorMode: boolean = false;
  /*Usuario*/ 
  nombreUsuario: string = '';
  rutUsuario: string = '';
  carreraUsuario: string = '';
  direccionUsuario: string = '';
  telefonoUsuario: string = '';
  /* conductor */
  patenteConductor: string = '';
  marcaConductor: string = '';
  modeloConductor: string = '';
  destinoConductor: string = '';
  telefonoConductor: string = '';

  constructor(
    private router: Router,
    private modalController: ModalController,
    private animationCtrl: AnimationController
  ) {}

  ngAfterViewInit() {
    // Cargar datos del usuario desde localStorage
    const usuarioString = localStorage.getItem('usuario');
    if (usuarioString) {
      const usuario = JSON.parse(usuarioString);
      this.nombreUsuario = usuario.nombre;
      this.rutUsuario = usuario.rut; 
      this.carreraUsuario = usuario.carrera;
      this.direccionUsuario = usuario.direccion;
      this.telefonoUsuario = usuario.telefono;
    }

    // Cargar datos del conductor desde localStorage
    const conductorString = localStorage.getItem('conductor');
    if (conductorString) {
      const conductor = JSON.parse(conductorString);
      this.patenteConductor = conductor.patente;
      this.marcaConductor = conductor.marca; 
      this.modeloConductor = conductor.modelo;
      this.telefonoConductor = conductor.telefono;
      this.destinoConductor = conductor.destino;
    }

    // Inicializar datos de usuario y conductor en localStorage
    const usuario = {
      nombre: "Juan Hernandez",
      rut: "12.345.678-9",
      clave: "juanito123",
      email: "juan@gmail.com",
      carrera: "Ingeniería Civil Informática",
      direccion: "Calle Falsa 123",
      telefono: "123456789",
    };
    const conductor = {
      patente: "AB-1234",
      marca: "Toyota",
      modelo: "Sedan",
      telefono: "123456789",
      destino: "Hogwarts",
    };
    localStorage.setItem('conductor', JSON.stringify(conductor));
    localStorage.setItem('usuario', JSON.stringify(usuario));

    // Configurar animaciones del modal
    this.setModalAnimations();
  }

  private setModalAnimations() {
    if (!this.modal) return;

    const enterAnimation = (baseEl: HTMLElement) => {
      const root = baseEl.shadowRoot;
      if (!root) return;

      const backdropElement = root.querySelector('ion-backdrop') as HTMLElement;
      const wrapperElement = root.querySelector('.modal-wrapper') as HTMLElement;

      if (backdropElement && wrapperElement) {
        const backdropAnimation = this.animationCtrl
          .create()
          .addElement(backdropElement)
          .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

        const wrapperAnimation = this.animationCtrl
          .create()
          .addElement(wrapperElement)
          .keyframes([
            { offset: 0, opacity: '0', transform: 'scale(0)' },
            { offset: 1, opacity: '0.99', transform: 'scale(1)' },
          ]);

        return this.animationCtrl
          .create()
          .addElement(baseEl)
          .easing('ease-out')
          .duration(500)
          .addAnimation([backdropAnimation, wrapperAnimation]);
      } else {
        return null; // Return null if any of the elements don't exist
      }
    };

    const leaveAnimation = (baseEl: HTMLElement) => {
      const animation = enterAnimation(baseEl);
      return animation ? animation.direction('reverse') : null;
    };

    this.modal.enterAnimation = enterAnimation as any;
    this.modal.leaveAnimation = leaveAnimation as any;
  }

  toggleChange(event: any) {
    this.isConductorMode = event.detail.checked;
  }

  async closeModal() {
    if (this.modal) {
      await this.modal.dismiss();
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}