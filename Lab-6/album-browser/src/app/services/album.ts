import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { Album } from '../models/album';
import { Photo } from '../models/photo';

@Injectable({ providedIn: 'root' })
export class AlbumService {
  private apiUrl = 'https://jsonplaceholder.typicode.com';

  // кэшируем один раз
  private albumsCache$?: Observable<Album[]>;
  private photosCache = new Map<number, Observable<Photo[]>>();

  constructor(private http: HttpClient) {}

  getAlbums(): Observable<Album[]> {
    if (!this.albumsCache$) {
      this.albumsCache$ = this.http
        .get<Album[]>(`${this.apiUrl}/albums`)
        .pipe(shareReplay(1));
    }
    return this.albumsCache$;
  }

  getAlbum(id: number): Observable<Album> {
    return this.http.get<Album>(`${this.apiUrl}/albums/${id}`);
  }

  getAlbumPhotos(id: number): Observable<Photo[]> {
    if (!this.photosCache.has(id)) {
      const obs$ = this.http
        .get<Photo[]>(`${this.apiUrl}/albums/${id}/photos`)
        .pipe(shareReplay(1));
      this.photosCache.set(id, obs$);
    }
    return this.photosCache.get(id)!;
  }

  updateAlbum(album: Album): Observable<Album> {
    return this.http.put<Album>(`${this.apiUrl}/albums/${album.id}`, album);
  }

  deleteAlbum(id: number): Observable<void> {
    // если удаляешь — сбрось кэш, чтобы список перезагрузился корректно
    this.albumsCache$ = undefined;
    return this.http.delete<void>(`${this.apiUrl}/albums/${id}`);
    
  }
}