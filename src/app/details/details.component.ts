import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  id;
  movieInfo;
  key;
  src: any;
  link: any;
  constructor(private route: ActivatedRoute, private movieService: MovieService, private sanitizer: DomSanitizer) {
    this.route.params.subscribe(param=> this.id = param.id)
  }

  ngOnInit(): void {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
    this.getMovieInfo();
  }

  getMovieInfo(){
    this.movieService.getMovieInfo(this.id).subscribe(
      data => {
        this.movieInfo = data;
        if(data.videos.results.length > 0){
          this.key = data.videos.results[0].key;
        }
        this.src = this.sanitizer.bypassSecurityTrustResourceUrl(`http://www.youtube.com/embed/${this.key}`);
        this.link = this.sanitizer.bypassSecurityTrustStyle(`url("https://image.tmdb.org/t/p/original/${this.movieInfo.backdrop_path}")`);
        
      }
    )
  }
}
