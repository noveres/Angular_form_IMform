import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAnalyticsService, FormAnalytics, UserSegment } from '../../services/user-analytics.service';
import { UserManagementService } from '../../services/user-management.service';
import { IUser } from '../../interfaces/user.interface';

@Component({
  selector: 'app-analytics-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="analytics-dashboard">
      <section class="form-analytics">
        <h2>表單分析</h2>
        <div class="metrics">
          <div class="metric">
            <h3>平均填寫時長</h3>
            <p>{{ formAnalytics.completionTime | number:'1.0-0' }} 秒</p>
          </div>
          <div class="metric">
            <h3>完成率</h3>
            <p>{{ formAnalytics.completionRate | percent:'1.0-0' }}</p>
          </div>
        </div>
        <div class="selection-distribution">
          <h3>選擇類型分布</h3>
          <!-- 這裡可以添加圖表組件 -->
        </div>
      </section>

      <section class="user-segments">
        <h2>用戶分群</h2>
        <div class="segment-cards">
          @for (segment of userSegments; track segment.id) {
            <div class="segment-card">
              <h3>{{ segment.name }}</h3>
              <p>平均完成時間: {{ segment.avgCompletionTime | number:'1.0-0' }} 秒</p>
              <p>完成率: {{ segment.completionRate | percent:'1.0-0' }}</p>
              <p>職業: {{ segment.occupation }}</p>
              <div class="preferred-choices">
                <h4>偏好選擇：</h4>
                <ul>
                  @for (choice of segment.preferredChoices; track choice) {
                    <li>{{ choice }}</li>
                  }
                </ul>
              </div>
            </div>
          }
        </div>
      </section>
    </div>
  `,
  styles: [`
    .analytics-dashboard {
      padding: 20px;
    }
    
    .metrics {
      display: flex;
      gap: 20px;
      margin-bottom: 20px;
    }
    
    .metric {
      background: #f5f5f5;
      padding: 15px;
      border-radius: 8px;
      flex: 1;
    }
    
    .segment-cards {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }
    
    .segment-card {
      background: #fff;
      padding: 15px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
  `]
})
export class AnalyticsDashboardComponent implements OnInit {
  formAnalytics: FormAnalytics = {
    completionTime: 0,
    selectionTypes: {},
    completionRate: 0
  };

  userSegments: UserSegment[] = [];

  constructor(
    private userAnalyticsService: UserAnalyticsService,
    private userManagementService: UserManagementService
  ) {}

  ngOnInit() {
    this.loadAnalytics();
  }

  private loadAnalytics() {
    // 這裡實現加載分析數據的邏輯
    this.userManagementService.getUsers().subscribe((users: IUser[]) => {
      this.userSegments = this.userAnalyticsService.segmentUsers(users);
    });
  }
}
