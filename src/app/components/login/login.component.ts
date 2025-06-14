import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';         
import { NgIf } from '@angular/common';               // Importa NgIf
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
   encapsulation: ViewEncapsulation.None,  // <- 🔥 Esto desactiva el _ngcontent
  imports: [FormsModule, NgIf],                     // Aquí agregas NgIf
  
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.login({ username: this.username, password: this.password })
      .subscribe({
        next: () => this.router.navigate(['/empleados']),
        error: () => this.error = 'Credenciales inválidas'
      });
  }
}
