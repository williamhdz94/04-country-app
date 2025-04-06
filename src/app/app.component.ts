import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './layouts/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    FooterComponent
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
}
