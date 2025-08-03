import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

export interface User {
  userId: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  role?: string;
  status?: string;
  joinDate?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  private currentUserSubject = new BehaviorSubject<User | null>(this.getCurrentUser());

  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private router: Router) {
    // Check authentication status on service initialization
    this.checkAuthStatus();
  }

  private hasToken(): boolean {
    return localStorage.getItem('isAuthenticated') === 'true';
  }

  private getCurrentUser(): User | null {
    const userInfo = localStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo) : null;
  }

  private checkAuthStatus(): void {
    const isAuth = this.hasToken();
    const user = this.getCurrentUser();
    
    this.isAuthenticatedSubject.next(isAuth);
    this.currentUserSubject.next(user);
  }

  login(userId: string, password: string): Observable<boolean> {
    return new Observable(observer => {
      // Simulate API call
      setTimeout(() => {
        if (userId && password) {
          const user: User = {
            userId: userId,
            name: 'John Doe',
            email: 'john@example.com',
            phone: '+1 (555) 123-4567',
            location: 'New York, NY',
            role: 'Administrator',
            status: 'Active',
            joinDate: new Date('2023-01-15')
          };

          // Store authentication data
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('userInfo', JSON.stringify(user));

          // Store default password for demo purposes
          if (!localStorage.getItem('userPassword')) {
            localStorage.setItem('userPassword', 'password123');
          }

          // Update subjects
          this.isAuthenticatedSubject.next(true);
          this.currentUserSubject.next(user);

          observer.next(true);
          observer.complete();
        } else {
          observer.next(false);
          observer.complete();
        }
      }, 1000);
    });
  }

  logout(): void {
    // Clear authentication data
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userInfo');

    // Update subjects
    this.isAuthenticatedSubject.next(false);
    this.currentUserSubject.next(null);

    // Navigate to login
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  getCurrentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  updateUser(userData: Partial<User>): void {
    const currentUser = this.getCurrentUserValue();
    if (currentUser) {
      const updatedUser = { ...currentUser, ...userData };
      localStorage.setItem('userInfo', JSON.stringify(updatedUser));
      this.currentUserSubject.next(updatedUser);
    }
  }

  changePassword(currentPassword: string, newPassword: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      // Simulate API call delay
      setTimeout(() => {
        // In a real application, you would:
        // 1. Validate the current password against the server
        // 2. Hash the new password
        // 3. Update the password on the server
        
        // For demo purposes, we'll simulate a successful password change
        // In reality, you'd validate against the stored password
        const storedPassword = localStorage.getItem('userPassword') || 'password123';
        
        if (currentPassword !== storedPassword) {
          reject(new Error('Current password is incorrect'));
          return;
        }
        
        if (newPassword.length < 8) {
          reject(new Error('New password must be at least 8 characters long'));
          return;
        }
        
        // Store the new password (in real app, this would be hashed)
        localStorage.setItem('userPassword', newPassword);
        
        resolve(true);
      }, 1500);
    });
  }
}