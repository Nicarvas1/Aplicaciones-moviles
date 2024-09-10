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

  constructor(
    private router: Router,
    private modalController: ModalController,
    private animationCtrl: AnimationController
  ) {}

  ngAfterViewInit() {
    this.setModalAnimations();
  }

  private setModalAnimations() {
    if (!this.modal) return;

    const enterAnimation = (baseEl: HTMLElement) => {
      const root = baseEl.shadowRoot;
      if (!root) {
        throw new Error('Root shadow DOM not found');
      }

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
        return null; // Devolver null si alguno de los elementos no existe
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
