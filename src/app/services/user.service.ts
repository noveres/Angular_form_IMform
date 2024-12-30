import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  role: 'admin' | 'user';
  lastActive: string;
  status: 'active' | 'inactive';
  avatar?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [
    {
      id: 1,
      name: '張小明',
      email: 'zhang@example.com',
      username: 'zhang123',
      role: 'admin',
      lastActive: '2024-12-24 14:30',
      status: 'active',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
    },
    {
      id: 2,
      name: '李小華',
      email: 'li@example.com',
      username: 'li123',
      role: 'user',
      lastActive: '2024-12-24 12:15',
      status: 'active',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka'
    },
    {
      id: 3,
      name: '王大力',
      email: 'wang@example.com',
      username: 'wang123',
      role: 'user',
      lastActive: '2024-12-23 16:45',
      status: 'inactive',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bailey'
    }
  ];

  private usersSubject = new BehaviorSubject<User[]>(this.users);

  getUsers(): Observable<User[]> {
    return this.usersSubject.asObservable().pipe(delay(500));
  }

  getUserById(id: number): Observable<User | undefined> {
    return this.usersSubject.pipe(
      map(users => users.find(u => u.id === id)),
      delay(500)
    );
  }

  createUser(user: Omit<User, 'id' | 'lastActive'>): Observable<User> {
    const newUser: User = {
      ...user,
      id: this.users.length + 1,
      lastActive: new Date().toLocaleString(),
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random()}`
    };

    this.users.push(newUser);
    this.usersSubject.next(this.users);
    return of(newUser).pipe(delay(500));
  }

  updateUser(id: number, updates: Partial<User>): Observable<User> {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) {
      throw new Error('User not found');
    }

    const updatedUser = {
      ...this.users[index],
      ...updates,
      lastActive: new Date().toLocaleString()
    };

    this.users[index] = updatedUser;
    this.usersSubject.next(this.users);
    return of(updatedUser).pipe(delay(500));
  }

  deleteUser(id: number): Observable<void> {
    this.users = this.users.filter(u => u.id !== id);
    this.usersSubject.next(this.users);
    return of(void 0).pipe(delay(500));
  }
}
