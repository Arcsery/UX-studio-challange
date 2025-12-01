import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Contact} from '../../contacts/dto/contact.model';
import {ButtonComponent} from '../button/button.component';
import {NgIf} from '@angular/common';
import {IconPlusComponent} from '../icons/icon-plus/icon-plus.component';
import {FormsModule} from '@angular/forms';

export type ContactDialogMode = 'create' | 'edit';
export interface ContactDialogModel {
  id?: number;
  name: string;
  phone?: string | null;
  email: string;
  imageUrl?: string | null;
}

@Component({
  selector: 'app-contact-dialog',
  imports: [
    ButtonComponent,
    NgIf,
    IconPlusComponent,
    FormsModule
  ],
  templateUrl: './contact-dialog.component.html',
  styleUrl: './contact-dialog.component.scss'
})
export class ContactDialogComponent {

  @Input() mode: ContactDialogMode = 'create';
  @Input() contact: Contact | null = null;
  @Input() model: ContactDialogModel = {
    name: '',
    email: '',
    phone: '',
    imageUrl: null
  };


  @Output() save = new EventEmitter<Contact>();
  @Output() cancel = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  get title(): string {
    return this.mode === 'create' ? 'Add contact' : 'Edit contact';
  }

  get pictureButtonLabel(): string {
    return this.mode === 'create' ? 'Add picture' : 'Change picture';
  }

  onSaveClick() {
    const result: Contact = {
      id: this.contact?.id ?? 0,
      name: this.model.name,
      email: this.model.email,
      phone: this.model.phone,
      imageUrl: this.model.imageUrl
    };

    this.save.emit(result);
  }

  onCancelClick() {
    this.cancel.emit();
  }

  onAddPictureClick() {

  }
}
