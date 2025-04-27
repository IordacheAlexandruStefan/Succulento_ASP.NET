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
  
  registerUsernameError: string = '';  // Holds the username error message
  registerPasswordError: string = '';  // Holds the password validation error

  constructor(private authService: AuthService) { }

  register(): void {
    // Reset previous username error on each submission
    this.registerUsernameError = '';
    
    // Validate password complexity
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
      error: (err) => {
        console.error('Registration failed:', err);
        // Check if the error message indicates the username already exists
        if (err.error && err.error.message && err.error.message.indexOf("already exists") !== -1) {
          this.registerUsernameError = "Username is already taken.";
        }
      }
    });
  }

  // Helper function to validate password complexity
  validatePassword(password: string): boolean {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;
    return regex.test(password);
  }
}
