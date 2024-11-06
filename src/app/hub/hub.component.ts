import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-hub',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hub.component.html',
  styleUrls: ['./hub.component.css']
})
export class HubComponent implements AfterViewInit {
  isDarkMode = false;
  newMessage = '';
  isMenuOpen = false;
  isLoading = false;
  selectedNotification = '';

  user = {
    avatar: '',
    name: 'Pedro',
    bio: 'Engineer',
    location: 'San Francisco, CA',
    website: 'dev.site',
    stats: {
      posts: 156,
      followers: 1432,
      following: 890
    },
    badges: ['Pro User', 'Top Contributor', 'Early Adopter']
  };

  feed = [
    { id: 1, content: 'Just finished a new project!', timestamp: '2023-10-01' },
    { id: 2, content: 'Loving the new Angular features.', timestamp: '2023-09-28' },
    { id: 4, content: 'Attended a great conference.', timestamp: '2023-09-20' },
  ];

  notifications = [
    'You have a new message from Jane.',
    'Your profile was viewed 10 times today.',
    'New comment on your post.',
  ];

  chatMessages = [
    { user: 'Jane', text: 'Hi John!', timestamp: '10:00 AM', avatar: 'assets/jane-avatar.png' },
    { user: 'John', text: 'Hello Jane!', timestamp: '10:01 AM', avatar: 'assets/john-avatar.png' },
  ];

  ngAfterViewInit(): void {
    this.initializeChart();
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-theme');
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      this.chatMessages.push({ user: 'You', text: this.newMessage, timestamp: new Date().toLocaleTimeString(), avatar: 'assets/your-avatar.png' });
      this.newMessage = '';
    }
  }

  showNotificationDetails(notification: string): void {
    this.selectedNotification = notification;
    document.getElementById('notificationModal')?.classList.add('open');
  }

  closeNotificationModal(): void {
    this.selectedNotification = '';
    document.getElementById('notificationModal')?.classList.remove('open');
  }

  simulateLoading(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  private initializeChart(): void {
    const ctx = document.getElementById('activityChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [{
          label: 'User Activity',
          data: [12, 19, 3, 5, 2, 3, 7],
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true,
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
