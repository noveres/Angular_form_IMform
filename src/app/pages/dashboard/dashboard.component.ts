import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard">
      <h1>儀表板</h1>
      
      <div class="stats-grid">
        <div class="stat-card">
          <h3>總問卷數</h3>
          <div class="stat-value">15</div>
        </div>
        
        <div class="stat-card">
          <h3>活躍問卷</h3>
          <div class="stat-value">8</div>
        </div>
        
        <div class="stat-card">
          <h3>總回覆數</h3>
          <div class="stat-value">256</div>
        </div>
        
        <div class="stat-card">
          <h3>用戶數量</h3>
          <div class="stat-value">42</div>
        </div>
      </div>

      <div class="recent-activity">
        <h2>最近活動</h2>
        <div class="activity-list">
          <div class="activity-item">
            <span class="activity-time">2024-12-24 14:30</span>
            <span class="activity-desc">新問卷創建：顧客滿意度調查</span>
          </div>
          <div class="activity-item">
            <span class="activity-time">2024-12-24 13:15</span>
            <span class="activity-desc">問卷更新：產品反饋表</span>
          </div>
          <div class="activity-item">
            <span class="activity-time">2024-12-24 11:45</span>
            <span class="activity-desc">新用戶註冊：張小明</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard {
      padding: 20px;
    }

    h1 {
      margin-bottom: 30px;
      color: #2c3e50;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-bottom: 40px;
    }

    .stat-card {
      background: white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);

      h3 {
        margin: 0;
        color: #7f8c8d;
        font-size: 1rem;
      }

      .stat-value {
        font-size: 2rem;
        font-weight: bold;
        color: #2c3e50;
        margin-top: 10px;
      }
    }

    .recent-activity {
      background: white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);

      h2 {
        color: #2c3e50;
        margin-bottom: 20px;
      }
    }

    .activity-list {
      .activity-item {
        padding: 15px 0;
        border-bottom: 1px solid #ecf0f1;
        display: flex;
        align-items: center;
        gap: 20px;

        &:last-child {
          border-bottom: none;
        }

        .activity-time {
          color: #95a5a6;
          font-size: 0.9rem;
          min-width: 150px;
        }

        .activity-desc {
          color: #2c3e50;
        }
      }
    }
  `]
})
export class DashboardComponent {
}
