import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router'; // Import RouterLink
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink // Add RouterLink to the imports array
  ],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {

  public authService = inject(AuthService);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  logout(): void {
    this.authService.logout();
    this.toastr.info('You have been logged out.'); // ℹ️ Інформаційне повідомлення
    this.router.navigate(['/login']);
  }
}