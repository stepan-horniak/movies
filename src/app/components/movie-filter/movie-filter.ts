import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { CommonModule } from '@angular/common';
import { Genre } from '../../models/movie.model/movie.model';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { Store } from '@ngrx/store';
import { filterSettings, loadGenresMovie } from '../../store/movie/action';
import { selectGenres } from '../../store/movie/selectors';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MessageService } from 'primeng/api';
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
    RadioButtonModule,
  ],
  templateUrl: './movie-filter.html',
  styleUrl: './movie-filter.scss',
})
export class MovieFilter implements OnInit {
  allGenres: Genre[] = [];
  filteredGenres: Genre[] = [];
  valueCategory: Genre | null = null;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadGenresMovie());
    this.store.select(selectGenres).subscribe((genres) => {
      this.allGenres = genres;
      this.filteredGenres = genres;
    });
    this.ratedIngredient = this.rated[0];
    this.adultIngredient = this.adult[0];
  }

  searchCategory(event: AutoCompleteCompleteEvent) {
    const query = event.query?.toLowerCase() ?? '';

    this.filteredGenres = this.allGenres.filter((genre) =>
      genre.name.toLowerCase().includes(query)
    );
  }
  //=========checkbox==============
  messageService = inject(MessageService);

  formSubmitted: boolean = false;

  ratedIngredient!: any;
  adultIngredient!: any;
  rated: any[] = [
    { name: 'топ рейтинг', key: true },
    { name: 'намменший рейтинг', key: false },
  ];

  adult: any[] = [
    { name: 'для дорослих', key: false },
    { name: 'для дітей', key: true },
  ];
  isInvalid(form: NgForm) {
    return !this.ratedIngredient && form.submitted;
  }

  //=============================
  itemsYear: string[] = [];
  valueYear: string | null = null;

  searchYear(event: AutoCompleteCompleteEvent) {
    const currentYear = new Date().getFullYear();

    const years = Array.from({ length: currentYear - 1970 }, (_, i) =>
      (currentYear - i).toString()
    );

    if (event.query) {
      this.itemsYear = years.filter((year) => year.startsWith(event.query));
    } else {
      this.itemsYear = years;
    }
  }
  onSubmit(form: NgForm) {
    if (!this.isInvalid(form)) {
      this.store.dispatch(
        filterSettings({
          adult: form.value.adultIngredient?.key,
          rated: form.value.ratedIngredient?.key,
          genre: parseInt(form.value.genre?.id),
          year: parseInt(form.value?.year),
        })
      );
    }
  }
}
