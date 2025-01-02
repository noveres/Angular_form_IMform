import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Questionnaire {
  id: number;
  title: string;
  status: 'active' | 'draft' | 'closed';
  responses: number;
  createdAt: string;
}

@Component({
  selector: 'app-questionnaire-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="questionnaire-list">
      <div class="header">
        <h1>問卷列表</h1>
        <button class="btn-primary" routerLink="questionnaire-form">新增問卷</button>
      </div>

      <div class="filters">
        <input type="text" placeholder="搜索問卷..." class="search-input">
        <select class="filter-select">
          <option value="all">所有狀態</option>
          <option value="active">活躍</option>
          <option value="draft">草稿</option>
          <option value="closed">已關閉</option>
        </select>
      </div>

      <div class="questionnaire-table">
        <table>
          <thead>
            <tr>
              <th>標題</th>
              <th>狀態</th>
              <th>回覆數</th>
              <th>創建日期</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            @for (questionnaire of questionnaires; track questionnaire.id) {
              <tr>
                <td>{{ questionnaire.title }}</td>
                <td>
                  <span class="status-badge" [class]="questionnaire.status">
                    {{ getStatusText(questionnaire.status) }}
                  </span>
                </td>
                <td>{{ questionnaire.responses }}</td>
                <td>{{ questionnaire.createdAt }}</td>
                <td class="actions">
                  <button class="btn-icon" [routerLink]="['/questionnaires', questionnaire.id]">
                    編輯
                  </button>
                  <button class="btn-icon" (click)="deleteQuestionnaire(questionnaire.id)">
                    刪除
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
    .questionnaire-list {
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

    .questionnaire-table {
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

      &.draft {
        background-color: #f1c40f;
        color: white;
      }

      &.closed {
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
export class QuestionnaireListComponent {
  questionnaires: Questionnaire[] = [
    {
      id: 1,
      title: '顧客滿意度調查',
      status: 'active',
      responses: 45,
      createdAt: '2024-12-24'
    },
    {
      id: 2,
      title: '產品反饋表',
      status: 'draft',
      responses: 0,
      createdAt: '2024-12-23'
    },
    {
      id: 3,
      title: '員工滿意度調查',
      status: 'closed',
      responses: 128,
      createdAt: '2024-12-20'
    }
  ];

  getStatusText(status: string): string {
    const statusMap: { [key: string]: string } = {
      active: '活躍',
      draft: '草稿',
      closed: '已關閉'
    };
    return statusMap[status] || status;
  }

  deleteQuestionnaire(id: number): void {
    if (confirm('確定要刪除這個問卷嗎？')) {
      this.questionnaires = this.questionnaires.filter(q => q.id !== id);
    }
  }
}
