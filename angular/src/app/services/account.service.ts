import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user.interface'; // Make sure this path is correct

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://localhost:7031/api/users';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const loginPayload = { username, password };
    return this.http.post<any>(`${this.baseUrl}/login`, loginPayload, this.httpOptions);
  }

  register(user: User): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, user, this.httpOptions);
  }
}
