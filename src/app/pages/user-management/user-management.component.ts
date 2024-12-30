import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCrudComponent } from '../../components/user-management/user-crud/user-crud.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    CommonModule,
    UserCrudComponent,
    MatTabsModule,
    MatIconModule,
    MatButtonModule
  ],
  template: `
    <div class="user-management-container">
      <header class="page-header">
        <div class="header-content">
          <h1>用戶管理</h1>
          <div class="header-actions">
            <button mat-raised-button color="primary" (click)="refresh()">
              <mat-icon>refresh</mat-icon>
              刷新
            </button>
          </div>
        </div>
      </header>

      <mat-tab-group>
        <mat-tab>
          <ng-template mat-tab-label>
            <mat-icon>people</mat-icon>
            用戶列表
          </ng-template>
          <app-user-crud></app-user-crud>
        </mat-tab>

        <mat-tab>
          <ng-template mat-tab-label>
            <mat-icon>settings</mat-icon>
            設置
          </ng-template>
          <div class="settings-container">
            <h2>用戶管理設置</h2>
            <!-- 這裡可以添加更多設置選項 -->
          </div>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styles: [`
    .user-management-container {
      padding: 20px;
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .page-header {
      margin-bottom: 20px;
      background: white;
      padding: 16px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;

      h1 {
        margin: 0;
        font-size: 24px;
        color: #333;
      }
    }

    .header-actions {
      display: flex;
      gap: 10px;
    }

    ::ng-deep .mat-tab-group {
      flex: 1;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);

      .mat-tab-header {
        border-bottom: 1px solid #e0e0e0;
      }

      .mat-tab-label {
        height: 48px;
        padding: 0 24px;
        opacity: 1;
        color: #666;

        &.mat-tab-label-active {
          color: #1976d2;
        }

        .mat-icon {
          margin-right: 8px;
        }
      }

      .mat-tab-body-wrapper {
        flex: 1;
      }
    }

    .settings-container {
      padding: 20px;

      h2 {
        margin: 0 0 20px 0;
        color: #333;
      }
    }
  `]
})
export class UserManagementComponent {
  refresh() {
    // 實現刷新邏輯
    console.log('Refreshing user data...');
  }
}
