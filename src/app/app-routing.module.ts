import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { DetailsComponent } from './details/details.component';


const routes: Routes = [
  {'path':'', component:MoviesComponent},
  {'path':'details/:id', component:DetailsComponent},
  {
    path: 'search/:term',
    loadChildren: () => import('./search/search.module').then(m => m.SearchModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
