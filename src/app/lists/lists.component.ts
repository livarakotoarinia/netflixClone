import { Component, OnInit, Input } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { Router } from '@angular/router'


@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {

  movies;
  @Input() id;
  constructor(private movieService: MovieService, private router: Router) { }

  ngOnInit() {
    this.getMovieByGenre();
  }

  getMovieByGenre() {
    this.movieService.getMoviesByGenres(this.id)
      .subscribe(data => { 
        this.movies = data.results;
      })
  }

  goTo(id){
    this.router.navigateByUrl(`/details/${id}`);
  }
}
