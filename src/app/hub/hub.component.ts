import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Chart from 'chart.js/auto';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-hub',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './hub.component.html',
  styleUrls: ['./hub.component.css']
})

export class HubComponent implements AfterViewInit, OnDestroy {
  feedError: string | undefined;
  fetchFeeds() {
    throw new Error('Method not implemented.');
  }
  isDarkMode = false;
  newMessage = '';
  isMenuOpen = false;
  isLoading = false;
  selectedNotification = '';
  newRepositoryName = '';
  angularRepoName = '';
  isCreatingAngularRepo = false;
  angularFeedbackMessage = '';
  reactRepoName = '';
  vueRepoName = '';
  isCreatingReactRepo = false;
  isCreatingVueRepo = false;
  reactFeedbackMessage = '';
  vueFeedbackMessage = '';

  user: any = {
    avatar: '',
    name: '', 
    bio: 'Engineer',
    location: 'San Francisco, CA',
    website: 'dev.site',
    stats: {
      posts: 156,
      followers: 1432,
      following: 890
    },
    badges: ['Pro User', 'Top Contributor', 'Early Adopter'],
    userFrameworks: [] as string[]
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

  private userSubscription: Subscription | undefined;

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngAfterViewInit(): void {
    this.initializeChart();
  }

  ngOnInit(): void {
    this.userSubscription = this.authService.user$.subscribe(user => {
      if (user) {
        this.user = user;
      }
    });
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
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
          y: { beginAtZero: true }
        }
      }
    });
  }

  addAngularFrameworkToUser(): void {
    if (!this.user.name) {
      console.log('No user is logged in.');
      return;
    }
    if (!this.angularRepoName.trim()) {
      this.angularFeedbackMessage = 'Please enter a repository name.';
      return;
    }
    this.isCreatingAngularRepo = true;
    this.angularFeedbackMessage = 'Creating Angular repository...';
    this.http.post('http://localhost:3000/angular', { 
      username: this.user.name, 
      repository: this.angularRepoName 
    })
    .subscribe(response => {
      console.log('Framework added to user and repository created:', response);
      if (!this.user.userFrameworks.includes('Angular')) {
        this.user.userFrameworks.push('Angular');
      }
      this.angularFeedbackMessage = 'Angular repository created successfully.';
      this.isCreatingAngularRepo = false;
      this.angularRepoName = '';
    }, error => {
      console.error('Error adding framework:', error);
      this.angularFeedbackMessage = 'Error creating Angular repository.';
      this.isCreatingAngularRepo = false;
    });
  }

  addReactFrameworkToUser(): void {
    if (!this.user.name) {
      console.log('No user is logged in.');
      return;
    }
    if (!this.reactRepoName.trim()) {
      this.reactFeedbackMessage = 'Please enter a repository name.';
      return;
    }
    this.isCreatingReactRepo = true;
    this.reactFeedbackMessage = 'Creating React repository...';
    this.http.post('http://localhost:3000/react', { 
      username: this.user.name,
      repository: this.reactRepoName
    })
    .subscribe(response => {
      console.log('Framework added to user and repository created:', response);
      if (!this.user.userFrameworks.includes('React')) {
        this.user.userFrameworks.push('React');
      }
      this.reactFeedbackMessage = 'React repository created successfully.';
      this.isCreatingReactRepo = false;
      this.reactRepoName = '';
    }, error => {
      console.error('Error adding framework:', error);
      this.reactFeedbackMessage = 'Error creating React repository.';
      this.isCreatingReactRepo = false;
    });
  }

  addVueFrameworkToUser(): void {
    if (!this.user.name) {
      console.log('No user is logged in.');
      return;
    }
    if (!this.vueRepoName.trim()) {
      this.vueFeedbackMessage = 'Please enter a repository name.';
      return;
    }
    this.isCreatingVueRepo = true;
    this.vueFeedbackMessage = 'Creating Vue repository...';
    this.http.post('http://localhost:3000/vue', { 
      username: this.user.name,
      repository: this.vueRepoName
    })
    .subscribe(response => {
      console.log('Framework added to user and repository created:', response);
      if (!this.user.userFrameworks.includes('Vue')) {
        this.user.userFrameworks.push('Vue');
      }
      this.vueFeedbackMessage = 'Vue repository created successfully.';
      this.isCreatingVueRepo = false;
      this.vueRepoName = '';
    }, error => {
      console.error('Error adding framework:', error);
      this.vueFeedbackMessage = 'Error creating Vue repository.';
      this.isCreatingVueRepo = false;
    });
  }

  createGithubRepository(): void {
    if (!this.user.name || !this.newRepositoryName.trim()) {
      console.log('User not logged in or repository name empty');
      return;
    }
    
    this.http.post('http://localhost:3000/github', {
      username: this.user.name,
      repository: this.newRepositoryName
    }).subscribe(
      response => {
        console.log('Repository created:', response);
        this.newRepositoryName = '';
      },
      error => {
        console.error('Error creating repository:', error);
      }
    );
  }
}
