import { Component } from '@angular/core';
import {ButtonComponent} from '../../components/button/button.component';
import {IconPlusComponent} from '../../components/icons/icon-plus/icon-plus.component';
import {IconSettingsComponent} from '../../components/icons/icon-settings/icon-settings.component';

@Component({
  selector: 'app-header',
  imports: [
    ButtonComponent,
    IconPlusComponent,
    IconSettingsComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
