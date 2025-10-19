import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  // form group
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  // when the form is submitted
  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response: any) => {
          this.toastr.success('Logged in successfully!'); 
          localStorage.setItem('token', response.token);
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.toastr.error('Invalid username or password.', 'Login Failed!'); 
        }
      });
    }
  }
}