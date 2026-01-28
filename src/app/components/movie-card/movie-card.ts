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
import { selectedMovie } from '../../store/movie/action';
import { Router } from '@angular/router';
import { MovieServise } from '../../services/movie.servise';
import { selectIsUserLogged } from '../../store/movie/selectors';
import { Observable, take } from 'rxjs';
import { Toast } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule, ConfirmPopup } from 'primeng/confirmpopup';
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
  @Output() removed = new EventEmitter<number>();
  isUserLogged: Observable<boolean>;
  constructor(
    private store: Store,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) {
    this.isUserLogged = this.store.select(selectIsUserLogged);
  }

  addToWatchList(event: Event, movieId: number) {
    event.stopPropagation();
    this.isUserLogged.pipe(take(1)).subscribe((isLogged) => {
      if (isLogged) {
        console.log(isLogged);

        const accountId = localStorage.getItem('accountId');
        const sessionId = localStorage.getItem('sessionId');
        if (accountId && sessionId) {
          console.log(accountId);

          this.movieService
            .updateFavoriteList('watchlist', movieId, accountId, sessionId)
            .subscribe();
        }
      }
    });
  }
  addToFavoriteList(event: Event, movieId: number) {
    event.stopPropagation();
    this.isUserLogged.pipe(take(1)).subscribe((isLogged) => {
      if (isLogged) {
        const accountId = localStorage.getItem('accountId');
        const sessionId = localStorage.getItem('sessionId');
        if (accountId && sessionId) {
          this.movieService
            .updateFavoriteList('favorite', movieId, accountId, sessionId)
            .subscribe();
        }
      }
    });
  }
  selectMovie(movie: Movie) {
    this.store.dispatch(selectedMovie({ movie }));
    this.router.navigate(['/movie-details']);
  }
  deleteMovieOnList(event: Event, movieId: number) {
    if (!this.isFavoritePage) return;

    event.stopPropagation();
    this.removed.emit(movieId);
  }
  //========================
  confirm1(event: Event) {
    event.stopPropagation();

    this.isUserLogged.pipe(take(1)).subscribe((isLogged) => {
      if (!isLogged) {
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
          accept: () => {},
          reject: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'зареєструйтесь щоб додати в список улюблених',
              life: 3000,
            });
          },
        });
      }
    });
  }
  confirm2(event: Event) {
    event.stopPropagation();

    this.isUserLogged.pipe(take(1)).subscribe((isLogged) => {
      if (!isLogged) {
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
          accept: () => {},
          reject: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'зареєструйтесь щоб додати в список улюблених',
              life: 3000,
            });
          },
        });
      }
    });
  }
}
