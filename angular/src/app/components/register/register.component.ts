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

  constructor(private authService: AuthService) { }

  register(): void {
    this.authService.register(this.user).subscribe({
      next: (res) => {
        console.log('Registration successful');
      },
      error: (err) => console.error(err)
    });
  }
}
