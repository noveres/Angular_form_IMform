import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  lastActive: string;
  status: 'active' | 'inactive';
}

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="user-list">
      <div class="header">
        <h1>用戶管理</h1>
        <button class="btn-primary" (click)="addUser()">新增用戶</button>
      </div>

      <div class="filters">
        <input type="text" [(ngModel)]="searchTerm" placeholder="搜索用戶..." class="search-input">
        <select [(ngModel)]="roleFilter" class="filter-select">
          <option value="">所有角色</option>
          <option value="admin">管理員</option>
          <option value="user">一般用戶</option>
        </select>
        <select [(ngModel)]="statusFilter" class="filter-select">
          <option value="">所有狀態</option>
          <option value="active">活躍</option>
          <option value="inactive">停用</option>
        </select>
      </div>

      <div class="user-table">
        <table>
          <thead>
            <tr>
              <th>姓名</th>
              <th>郵箱</th>
              <th>角色</th>
              <th>最後活動</th>
              <th>狀態</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            @for (user of filteredUsers; track user.id) {
              <tr>
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>{{ getRoleText(user.role) }}</td>
                <td>{{ user.lastActive }}</td>
                <td>
                  <span class="status-badge" [class]="user.status">
                    {{ getStatusText(user.status) }}
                  </span>
                </td>
                <td class="actions">
                  <button class="btn-icon" (click)="editUser(user)">編輯</button>
                  <button class="btn-icon" (click)="toggleUserStatus(user)">
                    {{ user.status === 'active' ? '停用' : '啟用' }}
                  </button>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .user-list {
      padding: 20px;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;

      h1 {
        margin: 0;
        color: #2c3e50;
      }
    }

    .filters {
      display: flex;
      gap: 15px;
      margin-bottom: 20px;
    }

    .search-input, .filter-select {
      padding: 8px 12px;
      border: 1px solid #ddd;
      border-radius: 5px;
      outline: none;

      &:focus {
        border-color: #3498db;
      }
    }

    .search-input {
      flex: 1;
    }

    .user-table {
      background: white;
      border-radius: 10px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      overflow: hidden;

      table {
        width: 100%;
        border-collapse: collapse;

        th, td {
          padding: 15px;
          text-align: left;
          border-bottom: 1px solid #ecf0f1;
        }

        th {
          background-color: #f8f9fa;
          font-weight: 600;
          color: #2c3e50;
        }
      }
    }

    .status-badge {
      padding: 5px 10px;
      border-radius: 15px;
      font-size: 0.9em;

      &.active {
        background-color: #2ecc71;
        color: white;
      }

      &.inactive {
        background-color: #95a5a6;
        color: white;
      }
    }

    .actions {
      display: flex;
      gap: 10px;
    }

    .btn-primary {
      background-color: #3498db;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: #2980b9;
      }
    }

    .btn-icon {
      padding: 5px 10px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      background-color: #f8f9fa;
      color: #2c3e50;
      transition: background-color 0.3s;

      &:hover {
        background-color: #e9ecef;
      }
    }
  `]
})
export class UserListComponent {
  users: User[] = [
    {
      id: 1,
      name: '張小明',
      email: 'zhang@example.com',
      role: 'admin',
      lastActive: '2024-12-24 14:30',
      status: 'active'
    },
    {
      id: 2,
      name: '李小華',
      email: 'li@example.com',
      role: 'user',
      lastActive: '2024-12-24 12:15',
      status: 'active'
    },
    {
      id: 3,
      name: '王大力',
      email: 'wang@example.com',
      role: 'user',
      lastActive: '2024-12-23 16:45',
      status: 'inactive'
    }
  ];

  searchTerm = '';
  roleFilter = '';
  statusFilter = '';

  get filteredUsers(): User[] {
    return this.users.filter(user => {
      const matchesSearch = !this.searchTerm || 
        user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesRole = !this.roleFilter || user.role === this.roleFilter;
      const matchesStatus = !this.statusFilter || user.status === this.statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }

  getRoleText(role: string): string {
    const roleMap: { [key: string]: string } = {
      admin: '管理員',
      user: '一般用戶'
    };
    return roleMap[role] || role;
  }

  getStatusText(status: string): string {
    const statusMap: { [key: string]: string } = {
      active: '活躍',
      inactive: '停用'
    };
    return statusMap[status] || status;
  }

  addUser() {
    // TODO: Implement add user dialog
    console.log('Adding new user...');
  }

  editUser(user: User) {
    // TODO: Implement edit user dialog
    console.log('Editing user:', user);
  }

  toggleUserStatus(user: User) {
    user.status = user.status === 'active' ? 'inactive' : 'active';
  }
}
