import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core'; // 1. Import ChangeDetectorRef
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AboutService } from '../services/about.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class AboutComponent implements OnInit {
  aboutService = inject(AboutService);
  authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef); // 2. Inject ChangeDetectorRef

  content: string = 'Loading...';
  editContent: string = '';
  isEditing: boolean = false;

  ngOnInit(): void {
    this.loadContent();
  }

  loadContent(): void {
    this.aboutService.getContent().subscribe({
      next: (data) => {
        this.content = data;
        this.editContent = data;
        
        // 3. Manually command Angular to update the screen.
        // This is the crucial fix.
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('--- ERROR FETCHING ABOUT CONTENT ---', err);
        this.content = 'Failed to load content. See browser console for details.';
        this.cdr.detectChanges(); // Also update on error
      }
    });
  }

  saveContent(): void {
    this.aboutService.updateContent(this.editContent).subscribe({
      next: () => {
        this.content = this.editContent;
        this.isEditing = false;
        this.cdr.detectChanges(); // Also update after saving
      },
      error: (err) => {
        console.error('--- ERROR SAVING ABOUT CONTENT ---', err);
        alert('Failed to save content.');
      }
    });
  }
}