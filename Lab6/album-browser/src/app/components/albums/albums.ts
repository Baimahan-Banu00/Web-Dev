import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AlbumService } from '../../services/album';
import { Album } from '../../models/album';

@Component({
  selector: 'app-albums',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './albums.html',
  styleUrl: './albums.css',
})
export class AlbumsComponent implements OnInit {
  albums: Album[] = [];
  loading = false;
  error = '';

  constructor(private albumService: AlbumService, private router: Router) {}

  ngOnInit(): void {
    this.loadAlbums();
  }

  loadAlbums(): void {
    this.loading = true;
    this.error = '';

    this.albumService.getAlbums().subscribe({
      next: (data) => {
        this.albums = data ?? [];
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load albums';
        this.loading = false;
      },
    });
  }

  deleteAlbum(id: number): void {
    this.albumService.deleteAlbum(id).subscribe({
      next: () => (this.albums = this.albums.filter(a => a.id !== id)),
      error: (err) => console.error(err),
    });
  }
}