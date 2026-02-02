import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { Movie } from '../../models/movie.model/movie.model';
import { ButtonModule } from 'primeng/button';
import { Store } from '@ngrx/store';
import {
  addToFavoriteListId,
  addToWatchListId,
  removeFromWatchListId,
  removeToFavoriteListId,
  selectedMovie,
} from '../../store/movie/action';
import { Router } from '@angular/router';
import { MovieServise } from '../../services/movie.servise';
import { selectIsUserLogged } from '../../store/movie/selectors';
import { Observable, take } from 'rxjs';
import { Toast } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule, ConfirmPopup } from 'primeng/confirmpopup';
import { LoginDialogService } from '../../services/login-popap.servise';
@Component({
  selector: 'app-movie-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonModule, Toast, ConfirmPopup, ToastModule, ConfirmPopupModule],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.scss',
  providers: [ConfirmationService, MessageService],
})
export class MovieCard {
  movieService = inject(MovieServise);
  @Input() movie!: Movie;
  @Input() isFavoritePage = false;
  @Input() isWatchListPage = false;
  @Output() removed = new EventEmitter<number>();
  isUserLogged: Observable<boolean>;

  constructor(
    private store: Store,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private loginPopupService: LoginDialogService,
  ) {
    this.isUserLogged = this.store.select(selectIsUserLogged);
  }

  addToWatchList(event: Event, movieId: number) {
    event.stopPropagation();

    this.store.dispatch(addToWatchListId({ movieId }));
    this.isUserLogged.pipe(take(1)).subscribe((isLogged) => {
      if (isLogged) {
        const accountId = localStorage.getItem('accountId');
        const sessionId = localStorage.getItem('sessionId');
        if (accountId && sessionId) {
          this.movieService
            .updateFavoriteList('watchlist', movieId, accountId, sessionId)
            .subscribe();
        }
      } else {
        this.confirmationService.confirm({
          target: event.currentTarget as EventTarget,
          message: 'зареєструватись?',
          icon: 'pi pi-exclamation-triangle',
          rejectButtonProps: {
            label: 'Cancel',
            severity: 'secondary',
            outlined: true,
          },
          acceptButtonProps: {
            label: 'Save',
          },
          accept: () => {
            this.loginPopupService.open();
          },
          reject: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'зареєструйтесь щоб додати в список улюблених',
              life: 2000,
            });
          },
        });
      }
    });
  }
  addToFavoriteList(event: Event, movieId: number) {
    event.stopPropagation();
    this.store.dispatch(addToFavoriteListId({ movieId }));
    this.isUserLogged.pipe(take(1)).subscribe((isLogged) => {
      if (isLogged) {
        const accountId = localStorage.getItem('accountId');
        const sessionId = localStorage.getItem('sessionId');
        if (accountId && sessionId) {
          this.movieService
            .updateFavoriteList('favorite', movieId, accountId, sessionId)
            .subscribe();
        }
      } else {
        this.confirmationService.confirm({
          target: event.currentTarget as EventTarget,
          message: 'зареєструватись?',
          icon: 'pi pi-exclamation-triangle',
          rejectButtonProps: {
            label: 'Cancel',
            severity: 'secondary',
            outlined: true,
          },
          acceptButtonProps: {
            label: 'Save',
          },
          accept: () => {
            this.loginPopupService.open();
          },
          reject: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'зареєструйтесь щоб додати в список улюблених',
              life: 2000,
            });
          },
        });
      }
    });
  }
  selectMovie(movie: Movie) {
    this.store.dispatch(selectedMovie({ movie }));
    this.router.navigate(['/movie-details']);
  }
  deleteMovieOnList(event: Event, movieId: number) {
    if (!this.isFavoritePage && !this.isWatchListPage) return;
    event.stopPropagation();
    this.removed.emit(movieId);
    if (this.isFavoritePage) {
      this.store.dispatch(removeToFavoriteListId({ movieId }));
    } else if (this.isWatchListPage) {
      this.store.dispatch(removeFromWatchListId({ movieId }));
    }
  }
}
