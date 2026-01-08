import { Component, OnInit } from '@angular/core';
import { Aside } from '../aside/aside';
import { ButtonModule } from 'primeng/button';
import { Store } from '@ngrx/store';
import { OnIdentifyEffects } from '@ngrx/effects';
import { selectIsUserLogged } from '../../store/movie/selectors';
import { map, Observable, take, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { Dialog } from 'primeng/dialog';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';
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
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  public buttonText = '';
  visible: boolean = false;
  value!: string;
  constructor(private store: Store) {}

  ngOnInit() {
    this.store
      .select(selectIsUserLogged)

      .pipe(take(1))
      .subscribe((isLogged) => {
        this.buttonText = isLogged ? 'Sing Up' : 'Sing In';
      });
  }

  userSingIn() {}

  showDialog() {
    this.visible = true;
  }

  closeDialog() {
    this.visible = false;
  }
}
