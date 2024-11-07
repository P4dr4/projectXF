import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: MockRouter;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, FormsModule, HttpClientTestingModule],
      providers: [{ provide: Router, useClass: MockRouter }],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router) as any;
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to info page', () => {
    component.goToInfo();
    expect(router.navigate).toHaveBeenCalledWith(['/info']);
  });

  it('should navigate to login page', () => {
    component.goToLogin();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should navigate to home page', () => {
    component.goToHome();
    expect(router.navigate).toHaveBeenCalledWith(['']);
  });

  it('should log submitted credentials', () => {
    component.username = 'testUser';
    component.password = 'testPassword';
    spyOn(console, 'log');
    component.onSubmit();
    expect(console.log).toHaveBeenCalledWith('Attempting login with username: testUser and password: testPassword');
  });

  afterEach(() => {
    if (httpMock) {
      httpMock.verify();
    }
  });
});
