import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

interface User {
  id: string;
  name: string;
  email: string;
  occupation: string;
  createdAt: Date;
  lastActive: Date;
}

@Component({
  selector: 'app-user-crud',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="user-crud-container">
      <!-- 用戶表單 -->
      <div class="user-form-section">
        <h3>{{ editingUser ? '編輯用戶' : '新增用戶' }}</h3>
        <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="name">姓名</label>
            <input id="name" type="text" formControlName="name" class="form-control">
            @if (userForm.get('name')?.errors?.['required'] && userForm.get('name')?.touched) {
              <div class="error-message">
                姓名為必填項
              </div>
            }
          </div>

          <div class="form-group">
            <label for="email">電子郵件</label>
            <input id="email" type="email" formControlName="email" class="form-control">
            @if (userForm.get('email')?.errors?.['email'] && userForm.get('email')?.touched) {
              <div class="error-message">
                請輸入有效的電子郵件地址
              </div>
            }
          </div>

          <div class="form-group">
            <label for="occupation">職業</label>
            <input id="occupation" type="text" formControlName="occupation" class="form-control">
          </div>

          <div class="form-actions">
            <button type="submit" [disabled]="!userForm.valid" class="btn-primary">
              {{ editingUser ? '更新' : '新增' }}
            </button>
            @if (editingUser) {
              <button type="button" (click)="cancelEdit()" class="btn-secondary">
                取消
              </button>
            }
          </div>
        </form>
      </div>

      <!-- 用戶列表 -->
      <div class="user-list-section">
        <div class="list-header">
          <h3>用戶列表</h3>
          <div class="search-box">
            <input type="text" 
                   placeholder="搜索用戶..." 
                   [(ngModel)]="searchTerm"
                   (input)="onSearch()"
                   [ngModelOptions]="{standalone: true}">
          </div>
        </div>

        <div class="user-list">
          @for (user of filteredUsers; track user.id) {
            <div class="user-item">
              <div class="user-info">
                <h4>{{ user.name }}</h4>
                <p>{{ user.email }}</p>
                <p class="occupation">{{ user.occupation }}</p>
                <p class="timestamps">
                  建立時間: {{ user.createdAt | date:'short' }}
                  <br>
                  最後活動: {{ user.lastActive | date:'short' }}
                </p>
              </div>
              <div class="user-actions">
                <button (click)="editUser(user)" class="btn-edit">編輯</button>
                <button (click)="deleteUser(user.id)" class="btn-delete">刪除</button>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .user-crud-container {
      display: grid;
      grid-template-columns: 300px 1fr;
      gap: 20px;
      padding: 20px;
    }

    .user-form-section {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .form-group {
      margin-bottom: 15px;

      label {
        display: block;
        margin-bottom: 5px;
        color: #333;
      }

      .form-control {
        width: 100%;
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 14px;

        &:focus {
          outline: none;
          border-color: #2196F3;
        }
      }

      .error-message {
        color: #f44336;
        font-size: 12px;
        margin-top: 5px;
      }
    }

    .form-actions {
      display: flex;
      gap: 10px;
      margin-top: 20px;

      button {
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;

        &:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
      }

      .btn-primary {
        background: #2196F3;
        color: white;

        &:hover {
          background: #1976D2;
        }
      }

      .btn-secondary {
        background: #f5f5f5;
        color: #333;

        &:hover {
          background: #e0e0e0;
        }
      }
    }

    .user-list-section {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);

      .list-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;

        .search-box input {
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
          width: 200px;
        }
      }
    }

    .user-list {
      display: grid;
      gap: 15px;

      .user-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px;
        border: 1px solid #eee;
        border-radius: 4px;

        &:hover {
          background: #f9f9f9;
        }

        .user-info {
          h4 {
            margin: 0 0 5px 0;
            color: #333;
          }

          p {
            margin: 0;
            color: #666;
            font-size: 14px;
          }

          .occupation {
            color: #2196F3;
            margin: 5px 0;
          }

          .timestamps {
            font-size: 12px;
            color: #999;
          }
        }

        .user-actions {
          display: flex;
          gap: 10px;

          button {
            padding: 6px 12px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 13px;
          }

          .btn-edit {
            background: #4CAF50;
            color: white;

            &:hover {
              background: #43A047;
            }
          }

          .btn-delete {
            background: #f44336;
            color: white;

            &:hover {
              background: #E53935;
            }
          }
        }
      }
    }
  `]
})
export class UserCrudComponent implements OnInit {
  userForm: FormGroup;
  users: User[] = [];
  filteredUsers: User[] = [];
  editingUser: User | null = null;
  searchTerm: string = '';

  constructor(private fb: FormBuilder) {
    this.userForm = this.createForm();
  }

  ngOnInit() {
    // 模擬從服務器加載數據
    this.loadUsers();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      occupation: ['']
    });
  }

  private loadUsers() {
    // 這裡應該是從服務器獲取數據
    // 目前使用模擬數據
    this.users = [
      {
        id: '1',
        name: '張三',
        email: 'zhang@example.com',
        occupation: '工程師',
        createdAt: new Date('2023-01-01'),
        lastActive: new Date()
      },
      // ... 更多用戶數據
    ];
    this.filteredUsers = [...this.users];
  }

  onSubmit() {
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      
      if (this.editingUser) {
        // 更新現有用戶
        const index = this.users.findIndex(u => u.id === this.editingUser!.id);
        this.users[index] = {
          ...this.editingUser,
          ...formData,
          lastActive: new Date()
        };
      } else {
        // 創建新用戶
        const newUser: User = {
          id: Math.random().toString(36).substr(2, 9),
          ...formData,
          createdAt: new Date(),
          lastActive: new Date()
        };
        this.users.unshift(newUser);
      }

      this.userForm.reset();
      this.editingUser = null;
      this.filteredUsers = [...this.users];
    }
  }

  editUser(user: User) {
    this.editingUser = user;
    this.userForm.patchValue({
      name: user.name,
      email: user.email,
      occupation: user.occupation
    });
  }

  deleteUser(userId: string) {
    if (confirm('確定要刪除此用戶嗎？')) {
      this.users = this.users.filter(u => u.id !== userId);
      this.filteredUsers = [...this.users];
    }
  }

  cancelEdit() {
    this.editingUser = null;
    this.userForm.reset();
  }

  onSearch() {
    const term = this.searchTerm.toLowerCase();
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.occupation.toLowerCase().includes(term)
    );
  }
}
