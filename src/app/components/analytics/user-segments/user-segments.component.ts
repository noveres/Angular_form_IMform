import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

interface UserSegment {
  name: string;
  users: number;
  characteristics: string[];
  avgCompletionTime: number;
  completionRate: number;
  preferredChoices: string[];
}

@Component({
  selector: 'app-user-segments',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  template: `
    <div class="segments-container">
      @for (segment of segments; track segment.name) {
        <div class="segment-card">
          <div class="segment-header">
            <h3>{{ segment.name }}</h3>
            <span class="user-count">{{ segment.users }} 用戶</span>
          </div>

          <div class="segment-metrics">
            <div class="metric">
              <span class="label">平均完成時間</span>
              <span class="value">{{ segment.avgCompletionTime | number:'1.0-0' }}秒</span>
            </div>
            <div class="metric">
              <span class="label">完成率</span>
              <span class="value">{{ segment.completionRate | percent:'1.0-0' }}</span>
            </div>
          </div>

          <div class="characteristics">
            <h4>特徵標籤</h4>
            <div class="tags">
              @for (char of segment.characteristics; track char) {
                <span class="tag">{{ char }}</span>
              }
            </div>
          </div>

          <div class="preferences">
            <h4>偏好選擇</h4>
            <ul>
              @for (choice of segment.preferredChoices; track choice) {
                <li>{{ choice }}</li>
              }
            </ul>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .segments-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      padding: 20px;
    }

    .segment-card {
      background: white;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .segment-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;

      h3 {
        margin: 0;
        color: #333;
      }

      .user-count {
        background: #e3f2fd;
        color: #1976d2;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 0.9rem;
      }
    }

    .segment-metrics {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
      margin-bottom: 20px;

      .metric {
        display: flex;
        flex-direction: column;
        gap: 5px;

        .label {
          color: #666;
          font-size: 0.9rem;
        }

        .value {
          font-size: 1.2rem;
          font-weight: bold;
          color: #2196F3;
        }
      }
    }

    .characteristics {
      margin-bottom: 20px;

      h4 {
        margin: 0 0 10px 0;
        color: #333;
      }

      .tags {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;

        .tag {
          background: #f5f5f5;
          color: #666;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.9rem;
        }
      }
    }

    .preferences {
      h4 {
        margin: 0 0 10px 0;
        color: #333;
      }

      ul {
        margin: 0;
        padding-left: 20px;
        color: #666;

        li {
          margin-bottom: 5px;
        }
      }
    }
  `]
})
export class UserSegmentsComponent implements OnInit {
  @Input() userData: any[] = [];

  segments: UserSegment[] = [];

  ngOnInit() {
    this.segmentUsers();
  }

  private segmentUsers() {
    // 根據時長分類
    const timeSegments = this.segmentByCompletionTime();
    
    // 根據完成度分類
    const completionSegments = this.segmentByCompletionRate();
    
    // 根據職業分類
    const occupationSegments = this.segmentByOccupation();
    
    // 合併所有分類結果
    this.segments = [
      ...timeSegments,
      ...completionSegments,
      ...occupationSegments
    ];
  }

  private segmentByCompletionTime(): UserSegment[] {
    const fastUsers = this.userData.filter(user => user.avgCompletionTime < 300);
    const normalUsers = this.userData.filter(user => user.avgCompletionTime >= 300 && user.avgCompletionTime < 600);
    const slowUsers = this.userData.filter(user => user.avgCompletionTime >= 600);

    return [
      this.createSegment('快速填寫者', fastUsers, ['快速決策', '高效率']),
      this.createSegment('平均填寫者', normalUsers, ['標準節奏', '穩定']),
      this.createSegment('深思熟慮者', slowUsers, ['謹慎', '細心'])
    ];
  }

  private segmentByCompletionRate(): UserSegment[] {
    const highCompletion = this.userData.filter(user => user.completionRate >= 0.9);
    const mediumCompletion = this.userData.filter(user => user.completionRate >= 0.6 && user.completionRate < 0.9);
    const lowCompletion = this.userData.filter(user => user.completionRate < 0.6);

    return [
      this.createSegment('完整填寫組', highCompletion, ['完整性高', '認真']),
      this.createSegment('部分填寫組', mediumCompletion, ['選擇性填寫', '重點關注']),
      this.createSegment('簡要填寫組', lowCompletion, ['快速瀏覽', '重點篩選'])
    ];
  }

  private segmentByOccupation(): UserSegment[] {
    const occupations = new Set(this.userData.map(user => user.occupation));
    
    return Array.from(occupations).map(occupation => {
      const users = this.userData.filter(user => user.occupation === occupation);
      return this.createSegment(
        `${occupation}群組`,
        users,
        [`${occupation}相關`, '職業特徵']
      );
    });
  }

  private createSegment(name: string, users: any[], characteristics: string[]): UserSegment {
    const avgCompletionTime = users.reduce((acc, user) => acc + user.avgCompletionTime, 0) / users.length;
    const completionRate = users.reduce((acc, user) => acc + user.completionRate, 0) / users.length;
    
    return {
      name,
      users: users.length,
      characteristics,
      avgCompletionTime,
      completionRate,
      preferredChoices: this.getPreferredChoices(users)
    };
  }

  private getPreferredChoices(users: any[]): string[] {
    const choices: { [key: string]: number } = {};
    
    users.forEach(user => {
      user.selections?.forEach((selection: any) => {
        choices[selection.value] = (choices[selection.value] || 0) + 1;
      });
    });

    return Object.entries(choices)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([choice]) => choice);
  }
}
