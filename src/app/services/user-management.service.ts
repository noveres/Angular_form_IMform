import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { IUser, IUserCreateDTO, IUserUpdateDTO, UserRole, UserStatus } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  private apiUrl = 'api/users'; // 這裡替換為您的實際API地址
  private usersSubject = new BehaviorSubject<IUser[]>([]);
  users$ = this.usersSubject.asObservable();

  constructor(private http: HttpClient) {}

  // 獲取所有用戶
  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.apiUrl).pipe(
      tap(users => this.usersSubject.next(users))
    );
  }

  // 根據ID獲取用戶
  getUserById(id: string): Observable<IUser> {
    return this.http.get<IUser>(`${this.apiUrl}/${id}`);
  }

  // 創建新用戶
  createUser(user: IUserCreateDTO): Observable<IUser> {
    return this.http.post<IUser>(this.apiUrl, user).pipe(
      tap(newUser => {
        const currentUsers = this.usersSubject.value;
        this.usersSubject.next([...currentUsers, newUser]);
      })
    );
  }

  // 更新用戶
  updateUser(id: string, updates: IUserUpdateDTO): Observable<IUser> {
    return this.http.patch<IUser>(`${this.apiUrl}/${id}`, updates).pipe(
      tap(updatedUser => {
        const currentUsers = this.usersSubject.value;
        const index = currentUsers.findIndex(u => u.id === id);
        if (index !== -1) {
          currentUsers[index] = updatedUser;
          this.usersSubject.next([...currentUsers]);
        }
      })
    );
  }

  // 刪除用戶
  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        const currentUsers = this.usersSubject.value;
        this.usersSubject.next(currentUsers.filter(user => user.id !== id));
      })
    );
  }

  // 更改用戶狀態
  updateUserStatus(id: string, status: UserStatus): Observable<IUser> {
    return this.updateUser(id, { status });
  }

  // 更改用戶角色
  updateUserRole(id: string, role: UserRole): Observable<IUser> {
    return this.updateUser(id, { role });
  }

  // 搜索用戶
  searchUsers(query: string): Observable<IUser[]> {
    return this.users$.pipe(
      map(users => users.filter(user => 
        user.username.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase()) ||
        user.profile?.fullName?.toLowerCase().includes(query.toLowerCase())
      ))
    );
  }

  // 批量刪除用戶
  bulkDeleteUsers(ids: string[]): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/bulk-delete`, { ids }).pipe(
      tap(() => {
        const currentUsers = this.usersSubject.value;
        this.usersSubject.next(currentUsers.filter(user => !ids.includes(user.id)));
      })
    );
  }

  // 批量更新用戶狀態
  bulkUpdateStatus(ids: string[], status: UserStatus): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/bulk-status`, { ids, status }).pipe(
      tap(() => this.getUsers().subscribe())
    );
  }

  // 匯出用戶數據
  exportUsers(format: 'csv' | 'excel'): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/export`, {
      params: { format },
      responseType: 'blob'
    });
  }

  // 導入用戶數據
  importUsers(file: File): Observable<{ success: number; failed: number }> {
    const formData = new FormData();
    formData.append('file', file);
    
    return this.http.post<{ success: number; failed: number }>(
      `${this.apiUrl}/import`,
      formData
    ).pipe(
      tap(() => this.getUsers().subscribe())
    );
  }
}
