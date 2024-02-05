import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  nume: string;        // if your API uses "nume" instead of "name"
  descriere: string;   // if your API uses "descriere" instead of "description"
  pret: number;        // if your API uses "pret" instead of "price"
  urlPoza: string;     // if your API uses "urlPoza" instead of "imageUrl"
}

@Injectable({
  providedIn: 'root'
})
export class SucculentService {
  private apiUrl = 'https://localhost:7031/api/products';

  constructor(private http: HttpClient) { }

  getSucculents(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}