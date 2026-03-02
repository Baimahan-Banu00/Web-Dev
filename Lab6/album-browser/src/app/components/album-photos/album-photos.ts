import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { AlbumService } from '../../services/album';
import { Photo } from '../../models/photo';

@Component({
  selector: 'app-album-photos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './album-photos.html',
  styleUrl: './album-photos.css',
})
export class AlbumPhotosComponent implements OnInit {
  albumId = 0;
  photos: Photo[] = [];
  loading = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private albumService: AlbumService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.albumId = idParam ? Number(idParam) : 0;

    if (!this.albumId) {
      this.error = 'Invalid album id';
      return;
    }

    this.loadPhotos();
  }

  loadPhotos(): void {
    this.loading = true;
    this.error = '';

    this.albumService.getAlbumPhotos(this.albumId).subscribe({
      next: (data) => {
        this.photos = data ?? [];
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load photos';
        this.loading = false;
      },
    });
  }

  back(): void {
    this.router.navigate(['/albums', this.albumId]);
  }
}