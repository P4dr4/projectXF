import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hub',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hub.component.html',
  styleUrls: ['./hub.component.css']
})
export class HubComponent {
  user = {
    avatar: '',
    name: 'Pedro',
    bio: 'Engenieer',
    location: 'San Francisco, CA',
    website: 'dev.site'
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
    { user: 'Jane', text: 'Hi John!' },
    { user: 'John', text: 'Hello Jane!' },
  ];

}
