import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UrlService } from '../services/url.service'; 

@Component({
  selector: 'app-table', 
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.html', 
  styleUrl: './table.css'      
})
export class TableComponent implements OnInit { 
  private urlService = inject(UrlService);
  public urls: any[] = [];

  ngOnInit(): void {
    this.urlService.getUrls().subscribe({
      next: (data: any) => {
        this.urls = data;
        console.log('success!', this.urls);
      },
      error: (err) => {
        console.error('Error:', err);
      }
    });
  }
}