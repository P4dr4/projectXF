import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, SignupComponent],
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    const signupForm = component.signupForm;
    const signupFormValues = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false
    };
    expect(signupForm.value).toEqual(signupFormValues);
  });

  it('should validate the form', () => {
    const signupForm = component.signupForm;
    expect(signupForm.valid).toBeFalsy();

    signupForm.controls['username'].setValue('testuser');
    signupForm.controls['email'].setValue('test@example.com');
    signupForm.controls['password'].setValue('Password123!');
    signupForm.controls['confirmPassword'].setValue('Password123!');
    signupForm.controls['terms'].setValue(true);

    expect(signupForm.valid).toBeTruthy();
  });

  it('should toggle password visibility', () => {
    component.togglePasswordVisibility('password');
    expect(component.showPassword).toBeTrue();

    component.togglePasswordVisibility('password');
    expect(component.showPassword).toBeFalse();

    component.togglePasswordVisibility('confirmPassword');
    expect(component.showConfirmPassword).toBeTrue();

    component.togglePasswordVisibility('confirmPassword');
    expect(component.showConfirmPassword).toBeFalse();
  });

  it('should return correct password strength text', () => {
    expect(component.getPasswordStrengthText(0)).toBe('Very Weak');
    expect(component.getPasswordStrengthText(1)).toBe('Very Weak');
    expect(component.getPasswordStrengthText(2)).toBe('Weak');
    expect(component.getPasswordStrengthText(3)).toBe('Good');
    expect(component.getPasswordStrengthText(4)).toBe('Strong');
  });

  it('should return correct password strength class', () => {
    expect(component.getPasswordStrengthClass(0)).toBe('very-weak');
    expect(component.getPasswordStrengthClass(1)).toBe('very-weak');
    expect(component.getPasswordStrengthClass(2)).toBe('weak');
    expect(component.getPasswordStrengthClass(3)).toBe('good');
    expect(component.getPasswordStrengthClass(4)).toBe('strong');
  });

  it('should match passwords', () => {
    const form = component.signupForm;
    form.controls['password'].setValue('Password123!');
    form.controls['confirmPassword'].setValue('Password123!');
    expect(component.passwordMatchValidator(form)).toBeNull();

    form.controls['confirmPassword'].setValue('DifferentPassword');
    expect(component.passwordMatchValidator(form)).toEqual({ mismatch: true });
  });

  it('should navigate to home on goToHome', () => {
    const routerSpy = spyOn(component['router'], 'navigate');
    component.goToHome();
    expect(routerSpy).toHaveBeenCalledWith(['']);
  });

  it('should mark all fields as touched on invalid form submission', () => {
    spyOn(component.signupForm, 'markAllAsTouched');
    component.onSubmit();
    expect(component.signupForm.markAllAsTouched).toHaveBeenCalled();
  });

  it('should handle password strength calculation correctly', () => {
    const passwordStrength = component.getPasswordStrength('Strong1!');
    expect(passwordStrength).toBe(4);
  });

  it('should handle password strength text correctly', () => {
    const passwordStrengthText = component.getPasswordStrengthText(4);
    expect(passwordStrengthText).toBe('Strong');
  });

  it('should handle password strength class correctly', () => {
    const passwordStrengthClass = component.getPasswordStrengthClass(4);
    expect(passwordStrengthClass).toBe('strong');
  });
});
