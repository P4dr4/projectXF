import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { InfoComponent } from './info.component';

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('InfoComponent', () => {
  let component: InfoComponent;
  let fixture: ComponentFixture<InfoComponent>;
  let router: MockRouter;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoComponent],
      providers: [{ provide: Router, useClass: MockRouter }],
    }).compileComponents();

    fixture = TestBed.createComponent(InfoComponent);
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
