// src/app/components/login/login.component.ts

import { Component } from '@angular/core';
import { AuthService } from '../../services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username!: string;
  password!: string;

  constructor(private authService: AuthService, private router: Router) { }

  login(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        console.log('Login response:', res); // Log the entire response object
        this.router.navigate(['/shop']).then(success => {
          console.log('Navigation success:', success);
        }).catch(err => {
          console.log('Navigation error:', err);
        });
      },
      error: (err) => {
        console.error('Login error:', err);
      }
    });
  }
}
