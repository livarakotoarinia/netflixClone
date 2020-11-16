import { HostListener, Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  genreMovie;
  search: string;
  popular;
  banner;
  showNav = false;
  search_movies;
  constructor(private movieService: MovieService, private sanitizer: DomSanitizer, private route: Router) { }

  ngOnInit() {
    this.getMovieGenre();
    this.getPopular();
  }
  
  // event scroll: if user scroll past 100 px
  @HostListener('window:scroll', ['$event']) 
    scrollHandler(event) {
      if(window.scrollY > 100){
        this.showNav = true;
      }else this.showNav = false;
    }

  getMovieGenre(){
    this.movieService.getMovieGenre().subscribe(data => {
      this.genreMovie = data.genres;
    })
  }

  getPopular(){
    this.movieService.getPopular().subscribe(data => {
      // get a random movie every time
      this.popular = data.results[Math.floor(Math.random() * data.results.length)]
      this.banner = this.sanitizer.bypassSecurityTrustStyle(`url("https://image.tmdb.org/t/p/original/${this.popular.backdrop_path}")`);
    })
  }

  searchTerms(term){
    this.route.navigate(['search', term]);
  }
 
  scroll(ev){
    if(window.scrollY > 100){
      this.showNav = true;
    }else this.showNav = false;
  }
}
