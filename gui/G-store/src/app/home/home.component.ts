import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <section class="hero is-info is-fullheight is-bold">
    <div class="hero-body">
    <div class="container">

      <h1 class="title is-1">Welcome to G-Store!</h1>

    </div>
    </div>
    </section>
  `,
  styles: [`
    .hero {
      text-shadow: 2px 2px #333333;
      background-image: url('assets/img/home_bg.gif') !important;
      background-size: cover;
      background-position: center center;
    }
  `]
})
export class HomeComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
  }

}
