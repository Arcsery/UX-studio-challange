import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Contact} from '../../contacts/dto/contact.model';
import {ButtonComponent} from '../button/button.component';

export type ContactDialogMode = 'create' | 'edit';

@Component({
  selector: 'app-contact-dialog',
  imports: [
    ButtonComponent
  ],
  templateUrl: './contact-dialog.component.html',
  styleUrl: './contact-dialog.component.scss'
})
export class ContactDialogComponent {

  @Input() mode: ContactDialogMode = 'create';
  @Input() contact: Contact | null = null;

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
    if (!this.contact) {
      this.save.emit({
        id: 0,
        name: 'New contact',
        email: 'new@example.com',
        phone: '+36 01 234 5678',
        imageUrl: null
      });
    } else {
      this.save.emit(this.contact);
    }
  }

  onCancelClick() {
    this.cancel.emit();
  }

  onDeleteClick() {
    this.delete.emit();
  }
}
