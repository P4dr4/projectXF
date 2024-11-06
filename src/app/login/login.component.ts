import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = ''; // Keep this empty for user input
  password: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  goToInfo(): void {
    this.router.navigate(['/info']);
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  goToHome(): void {
    this.router.navigate(['']);
  }

  goToSignup(): void {
    this.router.navigate(['/signup']);
  }

  onSubmit(): void {
    console.log(`Attempting login with username: ${this.username} and password: ${this.password}`);
    this.http.post('http://localhost:3000/login', { username: this.username, password: this.password })
      .subscribe(
        response => {
          console.log('Login successful', response);
          this.router.navigate(['/hub']); 
        },
        error => {
          console.error('Login failed', error);
        }
      );
  }
}
