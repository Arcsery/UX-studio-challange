import {Component, Input} from '@angular/core';
import {Contact} from '../dto/contact.model';
import {NgIf} from '@angular/common';
import {ButtonComponent} from '../../components/button/button.component';
import {IconCallComponent} from '../../components/icons/icon-call/icon-call.component';
import {IconMuteComponent} from '../../components/icons/icon-mute/icon-mute.component';
import {IconMoreComponent} from '../../components/icons/icon-more/icon-more.component';

@Component({
  selector: 'app-contact-item',
  imports: [
    NgIf,
    ButtonComponent,
    IconCallComponent,
    IconMuteComponent,
    IconMoreComponent
  ],
  templateUrl: './contact-item.component.html',
  styleUrl: './contact-item.component.scss'
})
export class ContactItemComponent {
  @Input() contact!: Contact;
}
