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
  loginError: string = '';  // To hold error message

  constructor(private authService: AuthService, private router: Router) { }

  login(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        console.log('Login successful:', res);
        this.loginError = '';
        this.router.navigate(['/shop']).then(success => {
          console.log('Navigation success:', success);
        }).catch(err => {
          console.error('Navigation error:', err);
        });
      },
      error: (err) => {
        console.error('Login failed:', err);
        this.loginError = 'Username or password are wrong.';
      }
    });
  }
}
