import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  baseUrl = environment.apiConfig.baseUrl;
  api_key = environment.apiConfig.api_key;
  language = environment.apiConfig.language;

  constructor(private http: HttpClient) {}

  getMovieGenre(): Observable<any> {
    return this.http
      .get(
        `${this.baseUrl}/genre/movie/list?api_key=${this.api_key}&language=${this.language}`
      )
      .pipe(map((result) => result));
  }

  getMoviesByGenres(id): Observable<any> {
    return this.http
      .get(
        `${this.baseUrl}/discover/movie?api_key=${this.api_key}&language=${this.language}&with_genres=${id}`
      )
      .pipe(map((result) => result));
  }

  getPopular(): Observable<any> {
    return this.http
      .get(
        `${this.baseUrl}/movie/popular?api_key=${this.api_key}&language=${this.language}`
      )
      .pipe(map((result) => result));
  }

  getMovieInfo(id): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/movie/${id}?api_key=${this.api_key}&language=${this.language}&with_genres=${id}&append_to_response=videos`
    );
  }

  searchMovie(movie): Observable<any> {
    return this.http
      .get(
        `${this.baseUrl}/search/movie?api_key=${this.api_key}&language=${this.language}&query=${movie}`
      )
      .pipe(map((result) => result));
  }
}
