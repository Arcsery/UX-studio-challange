import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ContactsPageComponent} from './contacts/contacts-page/contacts-page.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ContactsPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
}
