import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('./pages/home-page/home-page').then((m) => m.HomePage),
  },
  {
    path: 'favorite',
    loadComponent: () => import('./pages/favoryte-page/favoryte-page').then((m) => m.FavorytePage),
    canActivate: [AuthGuard],
  },
  {
    path: 'now-playing',
    loadComponent: () =>
      import('./pages/now-playing-page/now-playing-page').then((m) => m.NowPlayingPage),
  },
  {
    path: 'popular',
    loadComponent: () => import('./pages/popular-page/popular-page').then((m) => m.PopularPage),
  },
  {
    path: 'top-rated',
    loadComponent: () =>
      import('./pages/top-rated-page/top-rated-page').then((m) => m.TopRatedPage),
  },
  {
    path: 'upcoming',
    loadComponent: () => import('./pages/upcoming-page/upcoming-page').then((m) => m.UpcomingPage),
  },
  {
    path: 'watch-list',
    loadComponent: () =>
      import('./pages/watch-list-page/watch-list-page').then((m) => m.WatchListPage),
    canActivate: [AuthGuard],
  },
  {
    path: 'movie-details',
    loadComponent: () =>
      import('./pages/movie-details-page/movie-details-page').then((m) => m.MovieDetailsPage),
  },
];
