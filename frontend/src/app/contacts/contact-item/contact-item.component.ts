import {Component, Input} from '@angular/core';
import {Contact} from '../dto/contact.model';
import {NgIf} from '@angular/common';
import {ButtonComponent} from '../../components/button/button.component';
import {IconSettingsComponent} from '../../components/icons/icon-settings/icon-settings.component';
import {IconCallComponent} from '../../components/icons/icon-call/icon-call.component';
import {IconMuteComponent} from '../../components/icons/icon-mute/icon-mute.component';

@Component({
  selector: 'app-contact-item',
  imports: [
    NgIf,
    ButtonComponent,
    IconSettingsComponent,
    IconCallComponent,
    IconMuteComponent
  ],
  templateUrl: './contact-item.component.html',
  styleUrl: './contact-item.component.scss'
})
export class ContactItemComponent {
  @Input() contact!: Contact;
}
