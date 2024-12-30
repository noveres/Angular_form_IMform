import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-form-analytics',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  template: `
    <div class="form-analytics-container">
      <div class="analytics-card">
        <h3>填寫時長分析</h3>
        <div class="metric">
          <span class="label">平均填寫時間</span>
          <span class="value">{{ averageCompletionTime | number:'1.0-0' }} 秒</span>
        </div>
      </div>

      <div class="analytics-card">
        <h3>選擇類型分布</h3>
        <div class="distribution-list">
<<<<<<< HEAD
          <div *ngFor="let item of selectionDistribution | keyvalue" class="distribution-item">
            <span class="label">{{ item.key }}</span>
            <span class="value">{{ item.value }}次</span>
          </div>
=======
          @for (item of selectionDistribution | keyvalue; track item.key) {
            <div class="distribution-item">
              <span class="label">{{ item.key }}</span>
              <span class="value">{{ item.value }}次</span>
            </div>
          }
>>>>>>> b5099c3 (Initial commit with all files)
        </div>
      </div>

      <div class="analytics-card">
        <h3>表單完成率</h3>
        <div class="metric">
          <div class="progress-bar">
            <div class="progress" [style.width.%]="completionRate"></div>
          </div>
          <span class="value">{{ completionRate | number:'1.0-0' }}%</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .form-analytics-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      padding: 20px;
    }

    .analytics-card {
      background: white;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);

      h3 {
        margin: 0 0 15px 0;
        color: #333;
        font-size: 1.1rem;
      }
    }

    .metric {
      display: flex;
      flex-direction: column;
      gap: 10px;

      .label {
        color: #666;
        font-size: 0.9rem;
      }

      .value {
        font-size: 1.5rem;
        font-weight: bold;
        color: #2196F3;
      }
    }

    .distribution-list {
      display: flex;
      flex-direction: column;
      gap: 10px;

      .distribution-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 0;
        border-bottom: 1px solid #eee;

        &:last-child {
          border-bottom: none;
        }
      }
    }

    .progress-bar {
      width: 100%;
      height: 8px;
      background: #eee;
      border-radius: 4px;
      overflow: hidden;

      .progress {
        height: 100%;
        background: #4CAF50;
        transition: width 0.3s ease;
      }
    }
  `]
})
export class FormAnalyticsComponent implements OnInit {
  @Input() formData: any[] = [];

  averageCompletionTime: number = 0;
  selectionDistribution: { [key: string]: number } = {};
  completionRate: number = 0;

  ngOnInit() {
    this.calculateAnalytics();
  }

  private calculateAnalytics() {
    if (this.formData.length === 0) return;

    // 計算平均填寫時長
    this.averageCompletionTime = this.calculateAverageCompletionTime();

    // 計算選擇分布
    this.selectionDistribution = this.calculateSelectionDistribution();

    // 計算完成率
    this.completionRate = this.calculateCompletionRate();
  }

  private calculateAverageCompletionTime(): number {
    const times = this.formData.map(form => {
      const start = new Date(form.startTime).getTime();
      const end = new Date(form.endTime).getTime();
      return (end - start) / 1000; // 轉換為秒
    });

    return times.reduce((acc, time) => acc + time, 0) / times.length;
  }

  private calculateSelectionDistribution(): { [key: string]: number } {
    const distribution: { [key: string]: number } = {};
    
    this.formData.forEach(form => {
      form.selections?.forEach((selection: any) => {
        distribution[selection.type] = (distribution[selection.type] || 0) + 1;
      });
    });

    return distribution;
  }

  private calculateCompletionRate(): number {
    const totalFields = this.formData.reduce((acc, form) => acc + form.totalFields, 0);
    const completedFields = this.formData.reduce((acc, form) => acc + form.completedFields, 0);
    
    return (completedFields / totalFields) * 100;
  }
}
