import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from '../../shared/header/header.component';
import {ButtonComponent} from '../../components/button/button.component';
import {IconLightModeComponent} from '../../components/icons/icon-light-mode/icon-light-mode.component';
import {IconBackArrowComponent} from '../../components/icons/icon-back-arrow/icon-back-arrow.component';
import {Contact} from '../dto/contact.model';
import {NgForOf, NgIf} from '@angular/common';
import {ContactItemComponent} from '../contact-item/contact-item.component';
import {ContactDialogComponent, ContactDialogMode} from '../../components/contact-dialog/contact-dialog.component';

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

  contacts: Contact[] = [
    {
      id: 1,
      name: 'Timothy Lewis',
      email: 'timothy.lewis@example.com',
      phone: '+36 01 234 5678',
      imageUrl: 'https://i.pravatar.cc/150?img=5'
    },
    {
      id: 2,
      name: 'Sarah Wright',
      email: 'sarah.wright@example.com',
      phone: '+36 01 234 5678',
      imageUrl: 'https://i.pravatar.cc/150?img=32'
    },
    {
      id: 3,
      name: 'Lucy Jones',
      email: 'lucy.jones@example.com',
      phone: '+36 01 234 5678',
      imageUrl: 'https://i.pravatar.cc/150?img=15'
    },
    {
      id: 4,
      name: 'Jake Perez',
      email: 'jake.perez@example.com',
      phone: '+36 01 234 5678',
      imageUrl: 'https://i.pravatar.cc/150?img=52'
    },
    {
      id: 5,
      name: 'Adebayo Rodriguez',
      email: 'ade.bayo@example.com',
      phone: '+36 01 234 5678',
      imageUrl: 'https://i.pravatar.cc/150?img=68'
    }
  ];
  loading: boolean = false;

  isDialogOpen = false;
  dialogMode: ContactDialogMode = 'create';
  selectedContact: Contact | null = null;

  ngOnInit(): void {
      this.loadContacts();
    }

  loadContacts(): void {
    this.loading = true;

    this.loading = false;
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

  handleDialogSave(contact: Contact): void {
    console.log('SAVE FROM DIALOG', this.dialogMode, contact);
    this.isDialogOpen = false;
  }

  handleDialogDelete(): void {
    console.log('DELETE FROM DIALOG', this.selectedContact);
    this.isDialogOpen = false;
  }
}
