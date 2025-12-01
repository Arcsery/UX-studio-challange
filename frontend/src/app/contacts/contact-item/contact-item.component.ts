import {Component, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {Contact} from '../dto/contact.model';
import {NgIf} from '@angular/common';
import {ButtonComponent} from '../../components/button/button.component';
import {IconCallComponent} from '../../components/icons/icon-call/icon-call.component';
import {IconMuteComponent} from '../../components/icons/icon-mute/icon-mute.component';
import {IconMoreComponent} from '../../components/icons/icon-more/icon-more.component';
import {IconSettingsComponent} from '../../components/icons/icon-settings/icon-settings.component';
import {IconFavouriteComponent} from '../../components/icons/icon-favourite/icon-favourite.component';
import {IconDeleteComponent} from '../../components/icons/icon-delete/icon-delete.component';

@Component({
  selector: 'app-contact-item',
  imports: [
    NgIf,
    ButtonComponent,
    IconCallComponent,
    IconMuteComponent,
    IconMoreComponent,
    IconSettingsComponent,
    IconFavouriteComponent,
    IconDeleteComponent
  ],
  templateUrl: './contact-item.component.html',
  styleUrl: './contact-item.component.scss'
})
export class ContactItemComponent {
  @Input() contact!: Contact;

  @Output() edit = new EventEmitter<Contact>();
  @Output() favourite = new EventEmitter<Contact>();
  @Output() remove = new EventEmitter<Contact>();

  backendBaseUrl = 'http://localhost:8080';

  isMenuOpen = false;

  toggleMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.isMenuOpen = !this.isMenuOpen;
  }

  onEditClick(): void {
    this.edit.emit(this.contact);
    this.isMenuOpen = false;
  }

  onRemoveClick(): void {
    this.remove.emit(this.contact);
    this.isMenuOpen = false;
  }

  @HostListener('document:click')
  closeMenuOnOutsideClick(): void {
    this.isMenuOpen = false;
  }

  getImageSrc(contact: Contact): string | null {
    if (!contact.imageUrl) {
      return null;
    }
    if (contact.imageUrl.startsWith('http')) {
      return contact.imageUrl;
    }
    return `${this.backendBaseUrl}${contact.imageUrl}`;
  }

}
