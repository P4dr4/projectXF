import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HomeComponent } from './home.component';

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router: MockRouter;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HomeComponent], // Ensure HomeComponent is standalone
      providers: [{ provide: Router, useClass: MockRouter }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router) as any;
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

});
