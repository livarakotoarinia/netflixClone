import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  term;
  search_movies;
  constructor(private activatedRoute: ActivatedRoute, private movieService: MovieService) {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.term = params.get('term');
    });
  }

  ngOnInit(): void {
    this.searchTerm();
  }

  searchTerm(){
    // console.log(term);
    this.movieService.searchMovie(this.term).subscribe(data => {
      console.log(data);
      this.search_movies = data;
    })
  }
}
