import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core'; 
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UrlService } from '../services/url.service';
import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './table.html',
  styleUrl: './table.css'
})
export class TableComponent implements OnInit {
  private urlService = inject(UrlService);
  private cdr = inject(ChangeDetectorRef); 
  private toastr = inject(ToastrService);

  public urls: any[] = [];
  public newUrl: string = '';
  public apiUrl = environment.apiUrl;
  public authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit(): void {
    this.loadUrls();
  }

  loadUrls(): void {
    this.urlService.getUrls().subscribe({
      next: (data: any) => {
        this.urls = data;
        // shit
        this.cdr.detectChanges(); 
      },
      error: (err) => { 
        console.error('Error loading URLs:', err); 
      }
    });
  }

  onAddUrl(): void {
    if (!this.newUrl.trim()) return;
    this.urlService.addUrl(this.newUrl).subscribe({
      next: () => {
        this.toastr.success('URL shortened successfully!'); // ✅ Успіх
        this.newUrl = '';
        this.loadUrls(); 
      },
      error: (err) => {
        this.toastr.error(err.error, 'Error!'); // ❌ Помилка
      }
    });
  }

  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this URL?')) {
      this.urlService.deleteUrl(id).subscribe({
        next: () => {
          this.toastr.success('URL deleted successfully.'); // ✅ Успіх
          this.loadUrls();
        },
        error: (err) => {
          if (err.status === 403) {
            this.toastr.error('You do not have permission to delete this URL.'); // ❌ Помилка доступу
          } else {
            this.toastr.error('An error occurred while deleting the URL.'); // ❌ Інша помилка
          }
        }
      });
    }
  }

  onLogout(): void {
    this.authService.logout(); 
    this.router.navigate(['/login']); 
  }
}