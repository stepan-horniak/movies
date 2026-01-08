import { Component, OnInit } from '@angular/core';
import { Aside } from '../aside/aside';
import { ButtonModule } from 'primeng/button';
import { Store } from '@ngrx/store';
import { OnIdentifyEffects } from '@ngrx/effects';
import { selectIsUserLogged } from '../../store/movie/selectors';
import { debounceTime, distinctUntilChanged, map, Observable, take, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { Dialog } from 'primeng/dialog';
import { Password, PasswordModule } from 'primeng/password';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  public buttonText = '';
  visible: boolean = false;
  visibilityPassword = 'password';

  constructor(private store: Store) {}

  ngOnInit() {
    this.store
      .select(selectIsUserLogged)

      .pipe(take(1))
      .subscribe((isLogged) => {
        this.buttonText = isLogged ? 'Sing Up' : 'Sing In';
      });

    this.form.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe((value) => {
      console.log('Після паузи:', value);
    });
  }

  userSingIn() {}

  showDialog() {
    this.visible = true;
  }
  closeDialog() {
    this.visible = false;
  }
  visiblePass() {
    this.visibilityPassword === 'password'
      ? (this.visibilityPassword = 'text')
      : (this.visibilityPassword = 'password');
  }
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(8)]),
    password: new FormControl('', Validators.required),
  });
  onSubmitForm() {}
}
