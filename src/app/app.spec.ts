import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
  styles: [`
    :host {
      display: block;
      background-color: #000000;
      color: #ffffff;
      min-height: 100vh;
      font-family: Roboto, Helvetica, Arial, sans-serif;
    }
  `]
})
export class AppComponent {
  title = 'IFDb';
}