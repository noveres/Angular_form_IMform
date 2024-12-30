import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { UserManagementService } from '../../../services/user-management.service';
import { IUser, UserRole, UserStatus } from '../../../interfaces/user.interface';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatSelectModule,
    MatChipsModule,
    MatCheckboxModule,
    MatDividerModule
  ],
  template: `
    <div class="user-table-container">
      <!-- 工具欄 -->
      <div class="table-toolbar">
        <mat-form-field class="search-field">
          <mat-label>搜索用戶</mat-label>
          <input matInput (keyup)="applyFilter($event)" placeholder="輸入關鍵字..." #input>
          <mat-icon matSuffix>search</mat-icon>
        </mat-form-field>

        <div class="toolbar-actions">
          <button mat-raised-button color="primary" (click)="openAddDialog()">
            <mat-icon>add</mat-icon>
            新增用戶
          </button>
          <button mat-stroked-button [matMenuTriggerFor]="exportMenu">
            <mat-icon>download</mat-icon>
            匯出
          </button>
          <mat-menu #exportMenu="matMenu">
            <button mat-menu-item (click)="exportData('csv')">
              <mat-icon>description</mat-icon>
              <span>CSV</span>
            </button>
            <button mat-menu-item (click)="exportData('excel')">
              <mat-icon>table_chart</mat-icon>
              <span>Excel</span>
            </button>
          </mat-menu>
        </div>
      </div>

      <!-- 表格 -->
      <div class="table-container mat-elevation-z8">
        <table mat-table [dataSource]="dataSource" matSort>
          <!-- 選擇列 -->
          <ng-container matColumnDef="select">
            <th mat-header-cell *matHeaderCellDef>
              <mat-checkbox (change)="$event ? masterToggle() : null"
                          [checked]="selection.hasValue() && isAllSelected()"
                          [indeterminate]="selection.hasValue() && !isAllSelected()">
              </mat-checkbox>
            </th>
            <td mat-cell *matCellDef="let row">
              <mat-checkbox (click)="$event.stopPropagation()"
                          (change)="$event ? selection.toggle(row) : null"
                          [checked]="selection.isSelected(row)">
              </mat-checkbox>
            </td>
          </ng-container>

          <!-- 用戶名列 -->
          <ng-container matColumnDef="username">
            <th mat-header-cell *matHeaderCellDef mat-sort-header> 用戶名 </th>
            <td mat-cell *matCellDef="let user"> {{user.username}} </td>
          </ng-container>

          <!-- 郵箱列 -->
          <ng-container matColumnDef="email">
            <th mat-header-cell *matHeaderCellDef mat-sort-header> 郵箱 </th>
            <td mat-cell *matCellDef="let user"> {{user.email}} </td>
          </ng-container>

          <!-- 角色列 -->
          <ng-container matColumnDef="role">
            <th mat-header-cell *matHeaderCellDef mat-sort-header> 角色 </th>
            <td mat-cell *matCellDef="let user">
              <mat-chip [color]="getRoleColor(user.role)" selected>
                {{user.role}}
              </mat-chip>
            </td>
          </ng-container>

          <!-- 狀態列 -->
          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef mat-sort-header> 狀態 </th>
            <td mat-cell *matCellDef="let user">
              <mat-chip [color]="getStatusColor(user.status)" selected>
                {{user.status}}
              </mat-chip>
            </td>
          </ng-container>

          <!-- 最後登入列 -->
          <ng-container matColumnDef="lastLogin">
            <th mat-header-cell *matHeaderCellDef mat-sort-header> 最後登入 </th>
            <td mat-cell *matCellDef="let user"> {{user.lastLogin | date:'medium'}} </td>
          </ng-container>

          <!-- 操作列 -->
          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef> 操作 </th>
            <td mat-cell *matCellDef="let user">
              <button mat-icon-button [matMenuTriggerFor]="menu">
                <mat-icon>more_vert</mat-icon>
              </button>
              <mat-menu #menu="matMenu">
                <button mat-menu-item (click)="editUser(user)">
                  <mat-icon>edit</mat-icon>
                  <span>編輯</span>
                </button>
                <button mat-menu-item (click)="changeStatus(user)">
                  <mat-icon>swap_horiz</mat-icon>
                  <span>更改狀態</span>
                </button>
                <button mat-menu-item (click)="changeRole(user)">
                  <mat-icon>security</mat-icon>
                  <span>更改角色</span>
                </button>
                <mat-divider></mat-divider>
                <button mat-menu-item (click)="deleteUser(user)" color="warn">
                  <mat-icon color="warn">delete</mat-icon>
                  <span class="text-warn">刪除</span>
                </button>
              </mat-menu>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"
              (click)="selection.toggle(row)">
          </tr>

          <!-- 無數據行 -->
          <tr class="mat-row" *matNoDataRow>
            <td class="mat-cell" colspan="7">沒有找到符合 "{{input.value}}" 的數據</td>
          </tr>
        </table>

        <mat-paginator [pageSizeOptions]="[5, 10, 25, 100]"
                      aria-label="Select page of users">
        </mat-paginator>
      </div>
    </div>
  `,
  styles: [`
    .user-table-container {
      padding: 20px;
    }

    .table-toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .search-field {
      width: 300px;
    }

    .toolbar-actions {
      display: flex;
      gap: 10px;
    }

    .table-container {
      position: relative;
      min-height: 200px;
      max-height: 600px;
      overflow: auto;
    }

    table {
      width: 100%;
    }

    .mat-column-select {
      width: 48px;
      padding-left: 8px;
    }

    .mat-column-actions {
      width: 48px;
      text-align: center;
    }

    .text-warn {
      color: #f44336;
    }

    .mat-mdc-row:hover {
      background: whitesmoke;
    }

    .mat-mdc-chip.mat-primary {
      background-color: #1976d2;
      color: white;
    }

    .mat-mdc-chip.mat-accent {
      background-color: #69f0ae;
      color: black;
    }

    .mat-mdc-chip.mat-warn {
      background-color: #f44336;
      color: white;
    }
  `]
})
export class UserTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<IUser>;

  displayedColumns: string[] = [
    'select', 'username', 'email', 'role', 
    'status', 'lastLogin', 'actions'
  ];
  
  dataSource: MatTableDataSource<IUser>;
  selection = new SelectionModel<IUser>(true, []);

  constructor(private userService: UserManagementService) {
    this.dataSource = new MatTableDataSource<IUser>([]);
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(users => {
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource?.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  getRoleColor(role: UserRole): string {
    switch (role) {
      case UserRole.ADMIN:
        return 'primary';
      case UserRole.MANAGER:
        return 'accent';
      default:
        return 'default';
    }
  }

  getStatusColor(status: UserStatus): string {
    switch (status) {
      case UserStatus.ACTIVE:
        return 'accent';
      case UserStatus.INACTIVE:
        return 'default';
      case UserStatus.SUSPENDED:
        return 'warn';
      default:
        return 'default';
    }
  }

  editUser(user: IUser) {
    // TODO: 實現編輯用戶對話框
    console.log('Edit user:', user);
  }

  changeStatus(user: IUser) {
    // TODO: 實現更改狀態對話框
    console.log('Change status:', user);
  }

  changeRole(user: IUser) {
    // TODO: 實現更改角色對話框
    console.log('Change role:', user);
  }

  deleteUser(user: IUser) {
    if (confirm(`確定要刪除用戶 "${user.username}" 嗎？`)) {
      this.userService.deleteUser(user.id).subscribe(() => {
        this.loadUsers();
      });
    }
  }

  exportData(format: 'csv' | 'excel') {
    this.userService.exportUsers(format).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `users.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    });
  }

  openAddDialog() {
    // TODO: 實現添加用戶對話框
    console.log('Open add dialog');
  }
}
