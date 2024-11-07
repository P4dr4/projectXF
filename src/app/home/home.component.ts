import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true // Add this line to make it standalone
})

export class HomeComponent {
  navigationError: any;
  constructor(private router: Router) {}

  goToInfo(): void {
    this.router.navigate(['/info']);
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  goToHome(): void {
    this.router.navigate(['']);
  }

}
