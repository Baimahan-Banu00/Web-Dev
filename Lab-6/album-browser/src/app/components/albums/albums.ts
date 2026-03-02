import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../../services/album';
import { Album } from '../../modules/album.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-albums',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './albums.html',
  styleUrls: ['./albums.css'],
})
export class AlbumsComponent implements OnInit {
  albums: Album[] = [];
  loading: boolean = false;
  error: string = '';

  constructor(private albumService: AlbumService) {}

  ngOnInit(): void {
    this.fetchAlbums();
  }

  fetchAlbums(): void {
    this.loading = true;
    this.albumService.getAlbums().subscribe({
      next: (data) => {
        this.albums = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load albums';
        this.loading = false;
      },
    });
  }
  

  deleteAlbum(id: number): void {
    if (confirm('Are you sure you want to delete this album?')) {
      this.albumService.deleteAlbum(id).subscribe({
        next: () => {
          this.albums = this.albums.filter((a) => a.id !== id);
        },
        error: () => alert('Failed to delete album'),
      });
    }
  }
}