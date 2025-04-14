import { Component } from '@angular/core';
import { AuthService } from '../../services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = {
    username: '',
    email: '',
    password: '',
    nume: '',
    prenume: ''
  };
  registerPasswordError: string = '';  // To hold password validation error

  constructor(private authService: AuthService) { }

  register(): void {
    // Validate password for complexity
    if (!this.validatePassword(this.user.password)) {
      this.registerPasswordError = 'Password must contain at least one capital letter, one small letter, a number, and a special character.';
      return;
    } else {
      this.registerPasswordError = '';
    }
    this.authService.register(this.user).subscribe({
      next: (res) => {
        console.log('Registration successful:', res);
      },
      error: (err) => console.error('Registration failed:', err)
    });
  }

  // Helper function to validate password complexity
  validatePassword(password: string): boolean {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;
    return regex.test(password);
  }
}
