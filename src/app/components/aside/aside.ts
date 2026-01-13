import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { Drawer } from 'primeng/drawer';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectIsUserLogged, selectUserName } from '../../store/movie/selectors';
import { Observable, take } from 'rxjs';
import { CommonModule, NgStyle } from '@angular/common';
@Component({
  selector: 'app-aside',
  imports: [
    DrawerModule,
    ButtonModule,
    Ripple,
    AvatarModule,
    RouterLink,
    RouterLinkActive,
    NgStyle,
    CommonModule,
  ],
  templateUrl: './aside.html',
  styleUrl: './aside.scss',
})
export class Aside implements OnInit {
  visible: boolean = false;
  public userName$!: Observable<string>;
  userAuth$!: Observable<boolean>;

  @ViewChild('drawerRef') drawerRef!: Drawer;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.userAuth$ = this.store.select(selectIsUserLogged);
    this.userName$ = this.store.select(selectUserName);
  }

  closeCallback(e: any): void {
    this.drawerRef.close(e);
  }
}
