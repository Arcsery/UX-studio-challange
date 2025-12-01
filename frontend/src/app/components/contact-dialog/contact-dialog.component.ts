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
import {IconDeleteComponent} from '../icons/icon-delete/icon-delete.component';

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
    FormsModule,
    IconDeleteComponent
  ],
  templateUrl: './contact-dialog.component.html',
  styleUrl: './contact-dialog.component.scss'
})
export class ContactDialogComponent implements OnChanges {

  @Input() mode: ContactDialogMode = 'create';
  @Input() contact: Contact | null = null;

  @Output() save = new EventEmitter<{ contact: Contact; imageFile?: File | null }>();
  @Output() cancel = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  backendBaseUrl = 'http://localhost:8080';

  model: ContactDialogModel = {
    name: '',
    email: '',
    phone: '',
    imageUrl: null
  };

  selectedFile: File | null = null;

  ngOnChanges(changes: SimpleChanges): void {
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

      if (this.mode === 'create') {
        this.model = {
          name: '',
          email: '',
          phone: '',
          imageUrl: null
        };
        this.selectedFile = null;
      }
    }
  }

  get title(): string {
    return this.mode === 'create' ? 'Add contact' : 'Edit contact';
  }

  get pictureButtonLabel(): string {
    return this.model.imageUrl ? 'Change picture' : 'Add picture';
  }

  onSaveClick() {
    const result: Contact = {
      id: this.model.id ?? this.contact?.id ?? 0,
      name: this.model.name,
      email: this.model.email,
      phone: this.model.phone,
      imageUrl: this.model.imageUrl
    };

    this.save.emit({
      contact: result,
      imageFile: this.selectedFile
    });
  }

  onCancelClick() {
    this.cancel.emit();
  }

  onAddPictureClick(fileInput: HTMLInputElement) {
    fileInput.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];
    this.selectedFile = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.model.imageUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onRemovePictureClick(fileInput: HTMLInputElement) {
    this.selectedFile = null;
    this.model.imageUrl = null;
    fileInput.value = '';
  }

  getImageSrc(contact: ContactDialogModel): string | null {
    const url = contact.imageUrl;
    if (!url) {
      return null;
    }

    if (url.startsWith('http') || url.startsWith('data:')) {
      return url;
    }

    return `${this.backendBaseUrl}${url}`;
  }
}
