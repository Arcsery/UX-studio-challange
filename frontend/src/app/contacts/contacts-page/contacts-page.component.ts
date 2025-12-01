import { Component } from '@angular/core';
import {HeaderComponent} from '../../shared/header/header.component';
import {ButtonComponent} from '../../components/button/button.component';
import {IconLightModeComponent} from '../../components/icons/icon-light-mode/icon-light-mode.component';
import {IconBackArrowComponent} from '../../components/icons/icon-back-arrow/icon-back-arrow.component';

@Component({
  selector: 'app-contacts-page',
  imports: [
    HeaderComponent,
    ButtonComponent,
    IconLightModeComponent,
    IconBackArrowComponent
  ],
  templateUrl: './contacts-page.component.html',
  styleUrl: './contacts-page.component.scss'
})
export class ContactsPageComponent {
}
