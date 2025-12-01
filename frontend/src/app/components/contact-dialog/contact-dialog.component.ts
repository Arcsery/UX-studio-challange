import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges
} from '@angular/core';
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
  standalone: true,
  imports: [
    ButtonComponent,
    NgIf,
    IconPlusComponent,
    FormsModule
  ],
  templateUrl: './contact-dialog.component.html',
  styleUrl: './contact-dialog.component.scss'
})
export class ContactDialogComponent implements OnChanges {

  @Input() mode: ContactDialogMode = 'create';
  @Input() contact: Contact | null = null;

  @Output() save = new EventEmitter<Contact>();
  @Output() cancel = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  model: ContactDialogModel = {
    name: '',
    email: '',
    phone: '',
    imageUrl: null
  };

  ngOnChanges(changes: SimpleChanges): void {
    // Ha EDIT módban kapunk contactot, töltsük be a model-be
    if (changes['contact'] || changes['mode']) {
      if (this.mode === 'edit' && this.contact) {
        this.model = {
          id: this.contact.id,
          name: this.contact.name,
          email: this.contact.email,
          phone: this.contact.phone ?? '',
          imageUrl: this.contact.imageUrl ?? null
        };
      }

      // Ha CREATE mód, akkor reseteljük az üres formot
      if (this.mode === 'create') {
        this.model = {
          name: '',
          email: '',
          phone: '',
          imageUrl: null
        };
      }
    }
  }

  get title(): string {
    return this.mode === 'create' ? 'Add contact' : 'Edit contact';
  }

  get pictureButtonLabel(): string {
    return this.mode === 'create' ? 'Add picture' : 'Change picture';
  }

  onSaveClick() {
    const result: Contact = {
      id: this.model.id ?? this.contact?.id ?? 0,
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
    // majd ide jöhet file picker / url mező
  }
}
