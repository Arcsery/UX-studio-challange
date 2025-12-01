import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Contact} from './dto/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private readonly baseUrl = 'http://localhost:8080/api/contacts';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.baseUrl);
  }

  getOne(id: number): Observable<Contact> {
    return this.http.get<Contact>(`${this.baseUrl}/${id}`);
  }

  create(contact: Contact): Observable<Contact> {
    const body = {
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      imageUrl: contact.imageUrl
    };

    return this.http.post<Contact>(this.baseUrl, body);
  }

  update(id: number, contact: Contact): Observable<Contact> {
    const body = {
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      imageUrl: contact.imageUrl
    };

    return this.http.put<Contact>(`${this.baseUrl}/${id}`, body);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  uploadImage(id: number, file: File): Observable<Contact> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<Contact>(`${this.baseUrl}/${id}/image`, formData);
  }
}
