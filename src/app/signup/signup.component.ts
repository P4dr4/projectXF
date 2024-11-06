import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  passwordStrength: number = 0;
  passwordStrengthText: string = '';
  passwordStrengthClass: string = '';

  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      terms: [false, [Validators.requiredTrue]]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.signupForm.get('password')?.valueChanges.subscribe(value => {
      this.passwordStrength = this.getPasswordStrength(value);
      this.passwordStrengthText = this.getPasswordStrengthText(this.passwordStrength);
      this.passwordStrengthClass = this.getPasswordStrengthClass(this.passwordStrength);
    });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value ? null : { mismatch: true };
  }

  getPasswordStrength(password: string): number {
    let score = 0;
    if (!password) {
      return score;
    }
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  }

  getPasswordStrengthText(score: number): string {
    switch (score) {
      case 0:
      case 1:
        return 'Very Weak';
      case 2:
        return 'Weak';
      case 3:
        return 'Good';
      case 4:
        return 'Strong';
      default:
        return '';
    }
  }

  getPasswordStrengthClass(score: number): string {
    switch (score) {
      case 0:
      case 1:
        return 'very-weak';
      case 2:
        return 'weak';
      case 3:
        return 'good';
      case 4:
        return 'strong';
      default:
        return '';
    }
  }

  togglePasswordVisibility(field: string): void {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else if (field === 'confirmPassword') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      console.log('Form submitted', this.signupForm.value);
      alert('Form submitted successfully!');
      this.signupForm.reset();
    } else {
      this.signupForm.markAllAsTouched();
    }
  }

  get username() {
    return this.signupForm.get('username');
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get confirmPassword() {
    return this.signupForm.get('confirmPassword');
  }

  get terms() {
    return this.signupForm.get('terms');
  }

  goToHome(): void {
    this.router.navigate(['']);
  }
}