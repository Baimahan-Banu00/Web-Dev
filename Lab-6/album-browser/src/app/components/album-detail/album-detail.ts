import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlbumService } from '../../services/album';
import { Album } from '../../modules/album.model';

@Component({
  selector: 'app-album-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './album-detail.html',
  styleUrls: ['./album-detail.css']
})
export class AlbumDetailComponent implements OnInit {

  album!: Album;
  loading = true;
  error: string | null = null;
  saving = false;
  successMessage = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private albumService: AlbumService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      this.error = 'Invalid album ID';
      this.loading = false;
      return;
    }

    this.loadAlbum(id);
  }

  loadAlbum(id: number): void {
    this.albumService.getAlbum(id).subscribe({
      next: (data) => {
        this.album = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load album.';
        this.loading = false;
      }
    });
  }

  save(): void {
    if (!this.album.title.trim()) {
      this.error = 'Title cannot be empty';
      return;
    }

    this.saving = true;
    this.error = null;

    this.albumService.updateAlbum(this.album).subscribe({
      next: () => {
        this.saving = false;
        this.successMessage = true;

        setTimeout(() => {
          this.successMessage = false;
        }, 2000);
      },
      error: () => {
        this.error = 'Failed to update album';
        this.saving = false;
      }
    });
  }

  goToPhotos(): void {
    this.router.navigate(['/albums', this.album.id, 'photos']);
  }

  goBack(): void {
    this.router.navigate(['/albums']);
  }
}