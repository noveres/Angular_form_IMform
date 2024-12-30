import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { User } from './user.service';

export interface LoginCredentials {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  // 模擬用戶數據
  private readonly MOCK_USERS: User[] = [
    {
      id: 1,
      name: '管理員',
      email: 'admin@example.com',
      username: 'abc123',
      role: 'admin',
      lastActive: new Date().toLocaleString(),
      status: 'active',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin'
    }
  ];

  constructor() {
    // 檢查本地存儲中的用戶信息
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  login(credentials: LoginCredentials): Observable<User> {
    // 模擬API調用
    return of(credentials).pipe(
      delay(1000), // 模擬網絡延遲
      map(creds => {
        const user = this.MOCK_USERS.find(u => 
          u.username === creds.username && creds.password === 'abc123'
        );
        
        if (!user) {
          throw new Error('Invalid credentials');
        }
        
        return user;
      }),
      tap(user => {
        // 存儲用戶信息
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      })
    );
  }

  logout(): void {
    // 清除存儲的用戶信息
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}
