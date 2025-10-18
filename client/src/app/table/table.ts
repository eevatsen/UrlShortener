import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UrlService } from '../services/url.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './table.html',
  styleUrl: './table.css'
})
export class TableComponent implements OnInit {
  private urlService = inject(UrlService);
  public apiUrl = environment.apiUrl
  public urls: any[] = [];
  public newUrl: string = '';

  ngOnInit(): void {
    this.loadUrls();
  }

  loadUrls(): void {
    this.urlService.getUrls().subscribe({
      next: (data: any) => {
        this.urls = data;
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
        this.newUrl = '';
        this.loadUrls(); 
      },
      error: (err) => {
        console.error('Error adding URL:', err);
        alert(`Error: ${err.error}`);
      }
    });
  }

  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this URL?')) {
      this.urlService.deleteUrl(id).subscribe({
        next: () => {
          this.loadUrls();
        },
        error: (err) => {
          console.error(`Error deleting URL with id ${id}:`, err);
          if (err.status === 403) {
            alert('You do not have permission to delete this URL.');
          }
        }
      });
    }
  }
}