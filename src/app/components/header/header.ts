import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Aside } from '../aside/aside';
import { ButtonModule } from 'primeng/button';
import { Store } from '@ngrx/store';
import { selectIsUserLogged, selectSearchListMovies } from '../../store/movie/selectors';
import { debounceTime, distinctUntilChanged, filter, map, Observable, take } from 'rxjs';
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
import { isUserLogged, searchMovie } from '../../store/movie/action';
import { RouterLink } from '@angular/router';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MovieServise } from '../../services/movie.servise';
import { AutoComplete, AutoCompleteCompleteEvent } from 'primeng/autocomplete';
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
  public openPopapLogIn: boolean = true;
  public inputVIsiblePass = 'password';
  valueUserName: string | undefined;
  valuePassword: string | undefined;
  searchMovies$!: Observable<Movie[]>;
  selectedMovie!: Movie;
  filteredMovies: Movie[] = [];

  constructor(private store: Store) {}

  ngOnInit() {
    this.isLogged$ = this.store.select(selectIsUserLogged);
    this.search
      .get('search')
      ?.valueChanges.pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value) => {
        if (value) {
          this.store.dispatch(searchMovie({ movieName: value }));
          this.searchMovies$ = this.store.select(selectSearchListMovies);
        }
      });
    //===================================
  }

  filterCountry(event: AutoCompleteCompleteEvent) {
    const query = event.query.toLowerCase();

    this.searchMovies$
      .pipe(
        take(1), // один emit
        map((movies) => movies || []), // гарантуємо масив
        map((movies) => movies.filter((m: Movie) => m.title.toLowerCase().includes(query)))
      )
      .subscribe((filtered) => {
        this.filteredMovies = filtered;
      });
  }

  //=====================================

  showDialog() {
    this.isLogged$.pipe(take(1)).subscribe((isLogIn) => {
      if (isLogIn) {
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
    this.inputVIsiblePass === 'password'
      ? (this.inputVIsiblePass = 'text')
      : (this.inputVIsiblePass = 'password');
  }
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });
  onSubmitForm() {
    document.cookie = `name=${this.form.value.name}; path=/`;

    this.store.dispatch(isUserLogged());
    this.isLogged$ = this.store.select(selectIsUserLogged);
  }

  search = new FormGroup({
    search: new FormControl('', Validators.minLength(3)),
  });

  //==========================================
}
