// src/app/services/auth.service.ts

import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string;
  nameid: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // ... existing authentication methods
  
  getUserIdFromToken(): string {
    const token = localStorage.getItem('token');
    if (!token) return '';
  
    try {
      const decodedToken = jwtDecode<DecodedToken>(token);
      return decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] || '';
    } catch (error) {
      console.error('Error decoding token:', error);
      return '';
    }
  }
}