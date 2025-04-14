import { Component } from '@angular/core';
import { AuthService } from '../../services/account.service';
import { User } from '../../services/user.interface';
import { Router } from '@angular/router';
import { UpdateUserModel } from '../../services/update-user.model';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string;
  nameid: string;
}

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  showLogin = true;
  showRegister = false;
  username!: string;
  password!: string;
  loginError: boolean = false;  // Flag to indicate login error

  newUser: User = {
    username: '',
    email: '',
    password: '',
    nume: '',
    prenume: ''
  };

  // Property to store password complexity error for registration
  registerPasswordError: string = '';

  currentUser: UpdateUserModel = {
    nume: '',
    prenume: '',
    email: ''
  };

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) { }
  
  login(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        console.log('Login successful:', res);
        this.loginError = false; // Clear any previous error
        this.router.navigate(['/shop']);
      },
      error: (err) => {
        console.error('Login failed:', err);
        this.loginError = true;  // Show the error message
      }
    });
  }

  register(): void {
    // Validate the password before making the API call
    if (!this.validatePassword(this.newUser.password)) {
      this.registerPasswordError = 'Password must contain at least one capital letter, one small letter, a number, and a special character.';
      return;
    } else {
      this.registerPasswordError = '';
    }
    
    this.authService.register(this.newUser).subscribe({
      next: (res) => {
        console.log('Registration successful:', res);
      },
      error: (err) => {
        console.error('Registration failed:', err);
      }
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    console.log('Logout successful');
  }
  
  // New method: Remove the user's account.
  removeAccount(): void {
    const userId = this.getUserIdFromToken();
    if (!userId) {
      alert('Error: Cannot remove account without user ID.');
      return;
    }
    const apiUrl = `https://localhost:7031/api/users/${userId}`;
    this.http.delete(apiUrl).subscribe({
      next: (res) => {
        console.log('Account removed successfully:', res);
        alert('Account removed successfully.');
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Account removal failed:', err);
        alert('Failed to remove account. Please try again later.');
      }
    });
  }
  
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  updateUser(): void {
    const userId = this.getUserIdFromToken();
    if (!userId) {
      alert('Error: Cannot update user without user ID.');
      return;
    }
  
    const apiUrl = `https://localhost:7031/api/users/${userId}`;
    this.http.put(apiUrl, this.currentUser)
      .subscribe({
        next: (res) => {
          console.log('User updated successfully:', res);
          alert('User updated successfully.');
        },
        error: (err) => {
          console.error('Update failed:', err);
          alert('Update failed. Please try again later.');
        }
      });
  }
  
  private getUserIdFromToken(): string {
    const token = localStorage.getItem('token');
    if (!token) return '';
  
    try {
      const decodedToken = jwtDecode<DecodedToken>(token);
      console.log('Decoded token:', decodedToken);
  
      const userId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
      if (userId) {
        console.log('User ID from token:', userId);
        return userId;
      } else {
        console.error('User ID claim not found in token:', decodedToken);
        return '';
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      return '';
    }
  }

  // Helper function to validate password complexity
  validatePassword(password: string): boolean {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;
    return regex.test(password);
  }
}
