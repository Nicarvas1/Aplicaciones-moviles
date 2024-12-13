import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [IonicModule.forRoot(), HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);

    // Mock del localStorage
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      const store: { [key: string]: string } = {
        usuarios: JSON.stringify([
          { nombre: 'Nicolas Carmona', email: 'nic.carmona@duocuc.cl', clave: 'password' },
        ]),
      };
      return store[key] || null;
    });
    
    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string) => {
      console.log(`Guardado en localStorage - clave: ${key}, valor: ${value}`);
    });
    
  });

  it('login exitoso - debería redirigir a /inicio', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.email = 'nic.carmona@duocuc.cl';
    component.clave = 'password';
    component.login();
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'usuarioActual',
      JSON.stringify({ nombre: 'Nicolas Carmona', email: 'nic.carmona@duocuc.cl', clave: 'password' })
    );
    expect(navigateSpy).toHaveBeenCalledWith(['/inicio']);
  });
  

  it('login fallido - debería mostrar error en consola', () => {
    spyOn(console, 'error');
    component.email = 'incorrecto@gmail.com';
    component.clave = 'wrongpassword';
    component.login();
    expect(console.error).toHaveBeenCalledWith('Email o contraseña incorrectos.');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
