import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { AuthService, User } from '../services/auth.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  loginError(loginError: any) {
    throw new Error('Method not implemented.');
  }
  username: string = ''; 
  password: string = '';

  constructor(private router: Router, private http: HttpClient, private authService: AuthService) {} 

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
    this.http.post<any>(`${environment.apiBaseUrl}/login`, { username: this.username, password: this.password })
      .subscribe(
        response => {
          if (response.message === 'User logged in successfully') { 
            const user: User = {
              avatar: '',
              name: response.username,
              bio: 'Engineer',
              location: 'San Francisco, CA',
              website: 'dev.site',
              stats: {
                posts: 156,
                followers: 1432,
                following: 890
              },
              badges: ['Pro User', 'Top Contributor', 'Early Adopter'],
              userFrameworks: response.userFrameworks || []
            };
            this.authService.setUser(user);
            console.log('Login successful', response);
            this.router.navigate(['/hub']); 
          } else {
            console.log('Login failed');
          }
        },
        error => {
          console.error('Login failed', error);
        }
      );
  }
}
