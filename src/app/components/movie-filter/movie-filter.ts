import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { CommonModule } from '@angular/common';
import { FilterKey, Genre } from '../../models/movie.model/movie.model';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { Store } from '@ngrx/store';
import { loadGenresMovie } from '../../store/movie/action';
import { selectGenres } from '../../store/movie/selectors';
@Component({
  selector: 'app-movie-filter',
  imports: [
    FormsModule,
    CheckboxModule,
    MessageModule,
    ToastModule,
    AutoCompleteModule,
    ButtonModule,
    CommonModule,
  ],
  templateUrl: './movie-filter.html',
  styleUrl: './movie-filter.scss',
})
export class MovieFilter implements OnInit {
  allGenres: Genre[] = [];
  filteredGenres: Genre[] = [];
  value: Genre | null = null;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadGenresMovie());
    this.store.select(selectGenres).subscribe((genres) => {
      this.allGenres = genres;
      this.filteredGenres = genres;
    });
  }

  search(event: AutoCompleteCompleteEvent) {
    const query = event.query?.toLowerCase() ?? '';

    this.filteredGenres = this.allGenres.filter((genre) =>
      genre.name.toLowerCase().includes(query)
    );
  }
  //=========checkbox==============
  formSubmitted: boolean = false;
  formModel: Record<FilterKey, boolean> = {
    cheese: false,
    mushroom: false,
    pepper: false,
    onion: false,
  };
  get formKeys(): FilterKey[] {
    return Object.keys(this.formModel) as FilterKey[];
  }
  isInvalid(): boolean {
    return this.formSubmitted && !this.isAtLeastOneSelected();
  }
  isAtLeastOneSelected(): boolean {
    return Object.values(this.formModel).some((value) => value === true);
  }
  onSubmit(form: NgForm) {
    this.formSubmitted = true;
    if (this.isAtLeastOneSelected()) {
      this.formModel = {
        cheese: false,
        mushroom: false,
        pepper: false,
        onion: false,
      };
      form.resetForm(this.formModel);
      this.formSubmitted = false;
    }
  }
  //=============================
}
