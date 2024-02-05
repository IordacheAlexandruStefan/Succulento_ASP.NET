// src/app/services/auth.service.ts

import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string;
  nameid: string;
  role?: string | string[]; // A role can be a single role or an array of roles
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: string | string[];
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

  isAdmin(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;
  
    try {
      const decodedToken = jwtDecode<DecodedToken>(token);
      // Adjust the URL to match your role claim in the token
      const roles = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      return Array.isArray(roles) ? roles.includes('Admin') : roles === 'Admin';
    } catch (error) {
      console.error('Error decoding token:', error);
      return false;
    }
  }
}
