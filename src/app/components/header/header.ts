import { Component, OnInit } from '@angular/core';
import { Aside } from '../aside/aside';
import { ButtonModule } from 'primeng/button';
import { Store } from '@ngrx/store';
import { selectIsUserLogged } from '../../store/movie/selectors';
import { Observable, take } from 'rxjs';
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
import { isUserLogged } from '../../store/movie/action';
import { RouterLink } from '@angular/router';
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
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  public isLogged$!: Observable<boolean>;
  public openPopapLogIn: boolean = true;
  public inputVIsiblePass = 'password';

  constructor(private store: Store) {}

  ngOnInit() {
    this.isLogged$ = this.store.select(selectIsUserLogged);
  }

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
    name: new FormControl('stepan', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('12345678', [Validators.required, Validators.minLength(8)]),
  });
  onSubmitForm() {
    document.cookie = `name=${this.form.value.name}; path=/`;

    this.store.dispatch(isUserLogged());
    this.isLogged$ = this.store.select(selectIsUserLogged);
  }
}
