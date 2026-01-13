import { Component, OnInit } from '@angular/core';
import { Aside } from '../aside/aside';
import { ButtonModule } from 'primeng/button';
import { Store } from '@ngrx/store';
import { selectIsUserLogged, selectSearchListMovies } from '../../store/movie/selectors';
import { debounceTime, distinctUntilChanged, map, Observable, take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { Dialog } from 'primeng/dialog';
import { PasswordModule } from 'primeng/password';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IftaLabelModule } from 'primeng/iftalabel';
import { isUserLogged, searchMovie, selectedMovie } from '../../store/movie/action';
import { Router, RouterLink } from '@angular/router';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { FloatLabelModule } from 'primeng/floatlabel';
import {
  AutoComplete,
  AutoCompleteCompleteEvent,
  AutoCompleteSelectEvent,
} from 'primeng/autocomplete';
import { Movie } from '../../models/movie.model/movie.model';

@Component({
  selector: 'app-header',
  imports: [
    Aside,
    ButtonModule,
    CommonModule,
    Dialog,
    InputTextModule,
    FormsModule,
    PasswordModule,
    ReactiveFormsModule,
    RouterLink,
    IftaLabelModule,
    FloatLabelModule,
    IconFieldModule,
    InputIconModule,
    AutoComplete,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  public isLogged$!: Observable<boolean>;
  public openPopapLogIn = false;
  public inputVIsiblePass = 'password';

  searchMovies$: Observable<Movie[]>;
  filteredMovies: Movie[] = [];

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  search = new FormGroup({
    search: new FormControl('', Validators.minLength(3)),
  });

  constructor(private store: Store, private router: Router) {
    this.searchMovies$ = this.store.select(selectSearchListMovies);
  }

  ngOnInit(): void {
    this.isLogged$ = this.store.select(selectIsUserLogged);

    this.search
      .get('search')
      ?.valueChanges.pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value) => {
        if (value && value.length >= 3) {
          this.store.dispatch(searchMovie({ movieName: value }));
        }
      });
  }

  filterCountry(event: AutoCompleteCompleteEvent) {
    const query = event.query.toLowerCase();

    this.searchMovies$
      .pipe(
        take(1),
        map((movies) => movies || []),
        map((movies) => movies.filter((m: Movie) => m.title.toLowerCase().includes(query)))
      )
      .subscribe((filtered: Movie[]) => {
        this.filteredMovies = filtered;
      });
  }

  onMovieSelect(event: AutoCompleteSelectEvent) {
    const movie: Movie = event.value;
    this.store.dispatch(selectedMovie({ movie }));
    this.router.navigate(['/movie-details']);
  }

  showDialog() {
    this.isLogged$.pipe(take(1)).subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        document.cookie = `name=; path=/`;
        this.store.dispatch(isUserLogged());
      } else {
        this.openPopapLogIn = true;
      }
    });
  }

  closeDialog() {
    this.openPopapLogIn = false;
  }

  visiblePass() {
    this.inputVIsiblePass = this.inputVIsiblePass === 'password' ? 'text' : 'password';
  }

  onSubmitForm() {
    if (this.form.valid) {
      document.cookie = `name=${this.form.value.name}; path=/`;
      this.store.dispatch(isUserLogged());
      this.closeDialog();
    }
  }
}
