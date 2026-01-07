import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home-page/home-page').then((m) => m.HomePage) },
  {
    path: 'favoryte',
    loadComponent: () => import('./pages/favoryte-page/favoryte-page').then((m) => m.FavorytePage),
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
    path: 'watch-later',
    loadComponent: () =>
      import('./pages/watch-later-page/watch-later-page').then((m) => m.WatchLaterPage),
  },
];
