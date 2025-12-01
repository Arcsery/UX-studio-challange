import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from '../../shared/header/header.component';
import {ButtonComponent} from '../../components/button/button.component';
import {IconLightModeComponent} from '../../components/icons/icon-light-mode/icon-light-mode.component';
import {IconBackArrowComponent} from '../../components/icons/icon-back-arrow/icon-back-arrow.component';
import {Contact} from '../dto/contact.model';
import {NgForOf, NgIf} from '@angular/common';
import {ContactItemComponent} from '../contact-item/contact-item.component';
import {ContactDialogComponent, ContactDialogMode} from '../../components/contact-dialog/contact-dialog.component';
import {ContactService} from '../contact.service';
import {of, switchMap} from 'rxjs';

@Component({
  selector: 'app-contacts-page',
  imports: [
    HeaderComponent,
    ButtonComponent,
    IconLightModeComponent,
    IconBackArrowComponent,
    NgIf,
    ContactItemComponent,
    NgForOf,
    ContactDialogComponent
  ],
  templateUrl: './contacts-page.component.html',
  styleUrl: './contacts-page.component.scss'
})
export class ContactsPageComponent implements OnInit{

  contacts: Contact[] = [];
  loading: boolean = false;

  isDialogOpen = false;
  dialogMode: ContactDialogMode = 'create';
  selectedContact: Contact | null = null;

  ngOnInit(): void {
      this.loadContacts();
    }

  constructor(private contactService: ContactService) {}

  private loadContacts(): void {
    this.loading = true;
    this.contactService.getAll().subscribe({
      next: (data) => {
        this.contacts = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load contacts', err);
        this.loading = false;
      },
    });
  }

  openCreateDialog(): void {
    this.dialogMode = 'create';
    this.selectedContact = null;
    this.isDialogOpen = true;
  }

  openEditDialog(contact: Contact): void {
    this.dialogMode = 'edit';
    this.selectedContact = contact;
    this.isDialogOpen = true;
  }

  closeDialog(): void {
    this.isDialogOpen = false;
  }

  handleDialogSave(payload: { contact: Contact; imageFile?: File | null }): void {
    const { contact, imageFile } = payload;
    this.loading = true;

    if (this.dialogMode === 'create') {
      this.contactService.create(contact).pipe(
        switchMap(created =>
          imageFile
            ? this.contactService.uploadImage(created.id, imageFile)
            : of(created)
        )
      ).subscribe({
        next: () => {
          this.loadContacts();
          this.isDialogOpen = false;
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
          console.error('Failed to create contact', err);
        }
      });
    } else if (this.dialogMode === 'edit') {
      this.contactService.update(contact.id, contact).pipe(
        switchMap(updated =>
          imageFile
            ? this.contactService.uploadImage(updated.id, imageFile)
            : of(updated)
        )
      ).subscribe({
        next: () => {
          this.loadContacts();
          this.isDialogOpen = false;
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
          console.error('Failed to edit contact', err);
        }
      });
    }
  }

  onEditFromItem(contact: Contact): void {
    this.openEditDialog(contact);
  }

  onRemoveFromItem(contact: Contact): void {
    if (!contact.id) {
      return;
    }

    this.loading = true;
    this.contactService.delete(contact.id).subscribe({
      next: () => {
        this.loadContacts();
        this.loading = false;
        this.isDialogOpen = false;
      },
      error: err => {
        console.error('Failed to delete contact', err);
        this.loading = false;
      }
    });
  }
}
