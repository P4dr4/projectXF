import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HubComponent } from './hub/hub.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service'; // Import AuthService

const routes: Routes = [
  { path: '', component: HubComponent },
  { path: 'login', component: LoginComponent },
  // ... other routes
];

@NgModule({
  declarations: [
    // ... your components
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    // ... other modules
  ],
  providers: [AuthService], // Provide AuthService
  bootstrap: [HubComponent] // Or your main component
})
export class AppModule { }
