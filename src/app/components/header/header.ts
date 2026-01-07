import { Component } from '@angular/core';
import { Aside } from '../aside/aside';

@Component({
  selector: 'app-header',
  imports: [Aside],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {}
