import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { CdkDragDrop, moveItemInArray, CdkDragHandle, CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';

interface Question {
  id: number;
  type: 'text' | 'radio' | 'checkbox' | 'textarea';
  title: string;
  description?: string;
  options: string[];
  required: boolean;
}

@Component({
  selector: 'app-questionnaire-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDividerModule,
    MatSnackBarModule,
    CdkDragHandle,
    CdkDrag,
    CdkDropList
  ],
  template: `
    <div class="questionnaire-form">
      <mat-card class="header-card">
        <mat-card-header>
          <mat-card-title>{{ isEditing ? '編輯問卷' : '新增問卷' }}</mat-card-title>
          <mat-card-subtitle>創建一個新的問卷調查</mat-card-subtitle>
        </mat-card-header>
        <mat-card-actions align="end">
          <button mat-stroked-button color="primary" (click)="saveAsDraft()">
            <mat-icon>save</mat-icon>
            保存為草稿
          </button>
          <button mat-raised-button color="primary" (click)="publish()">
            <mat-icon>send</mat-icon>
            發布問卷
          </button>
        </mat-card-actions>
      </mat-card>

      <mat-card class="form-card">
        <mat-card-content>
          <div class="form-section">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>問卷標題</mat-label>
              <input matInput [(ngModel)]="title" placeholder="輸入問卷標題" required>
              <mat-icon matSuffix>title</mat-icon>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>問卷描述</mat-label>
              <textarea matInput [(ngModel)]="description" rows="3" placeholder="輸入問卷描述"></textarea>
              <mat-icon matSuffix>description</mat-icon>
            </mat-form-field>
          </div>
        </mat-card-content>
      </mat-card>

      <div cdkDropList (cdkDropListDropped)="drop($event)" class="questions-list">
<<<<<<< HEAD
        <mat-card *ngFor="let question of questions; let i = index" class="question-card" cdkDrag>
          <div class="drag-handle" cdkDragHandle>
            <mat-icon>drag_indicator</mat-icon>
          </div>
          
          <mat-card-content>
            <div class="question-header">
              <mat-form-field appearance="outline" class="question-title">
                <mat-label>問題 {{i + 1}}</mat-label>
                <input matInput [(ngModel)]="question.title" placeholder="輸入問題" required>
              </mat-form-field>

              <mat-form-field appearance="outline" class="question-type">
                <mat-label>類型</mat-label>
                <mat-select [(ngModel)]="question.type" (ngModelChange)="onQuestionTypeChange(question, $event)">
                  <mat-option value="text">文字</mat-option>
                  <mat-option value="textarea">長文字</mat-option>
                  <mat-option value="radio">單選</mat-option>
                  <mat-option value="checkbox">多選</mat-option>
                </mat-select>
              </mat-form-field>
            </div>

            <mat-form-field *ngIf="question.type !== 'text' && question.type !== 'textarea'"
                          appearance="outline" class="full-width">
              <mat-label>描述 (選填)</mat-label>
              <textarea matInput [(ngModel)]="question.description" rows="2" 
                        placeholder="輸入問題描述"></textarea>
            </mat-form-field>

            <div *ngIf="question.type === 'radio' || question.type === 'checkbox'" class="options-list">
              <div *ngFor="let option of question.options; let j = index" class="option-item">
                <mat-form-field appearance="outline" class="option-input">
                  <mat-label>選項 {{j + 1}}</mat-label>
                  <input matInput [(ngModel)]="question.options[j]" placeholder="輸入選項">
                  <button mat-icon-button matSuffix color="warn" 
                          (click)="deleteOption(question, j)"
                          [disabled]="question.options.length <= 2">
                    <mat-icon>remove_circle</mat-icon>
                  </button>
                </mat-form-field>
              </div>
              
              <button mat-stroked-button color="primary" 
                      (click)="addOption(question)" class="add-option-btn">
                <mat-icon>add</mat-icon>
                添加選項
              </button>
            </div>

            <mat-checkbox [(ngModel)]="question.required" color="primary">
              必填題目
            </mat-checkbox>
          </mat-card-content>

          <mat-card-actions align="end">
            <button mat-icon-button color="warn" (click)="deleteQuestion(question.id)"
                    matTooltip="刪除問題">
              <mat-icon>delete</mat-icon>
            </button>
          </mat-card-actions>
        </mat-card>
=======
        @for (question of questions; track question.id) {
          <mat-card class="question-card" cdkDrag>
            <div class="drag-handle" cdkDragHandle>
              <mat-icon>drag_indicator</mat-icon>
            </div>
            
            <mat-card-content>
              <div class="question-header">
                <mat-form-field appearance="outline" class="question-title">
                  <mat-label>問題 {{questions.indexOf(question) + 1}}</mat-label>
                  <input matInput [(ngModel)]="question.title" placeholder="輸入問題" required>
                </mat-form-field>

                <mat-form-field appearance="outline" class="question-type">
                  <mat-label>類型</mat-label>
                  <mat-select [(ngModel)]="question.type" (ngModelChange)="onQuestionTypeChange(question, $event)">
                    <mat-option value="text">文字</mat-option>
                    <mat-option value="textarea">長文字</mat-option>
                    <mat-option value="radio">單選</mat-option>
                    <mat-option value="checkbox">多選</mat-option>
                  </mat-select>
                </mat-form-field>
              </div>

              @if (question.type !== 'text' && question.type !== 'textarea') {
                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>描述 (選填)</mat-label>
                  <textarea matInput [(ngModel)]="question.description" rows="2" 
                            placeholder="輸入問題描述"></textarea>
                </mat-form-field>
              }

              @if (question.type === 'radio' || question.type === 'checkbox') {
                <div class="options-list">
                  @for (option of question.options; track $index) {
                    <div class="option-item">
                      <mat-form-field appearance="outline" class="option-input">
                        <mat-label>選項 {{$index + 1}}</mat-label>
                        <input matInput [(ngModel)]="question.options[$index]" placeholder="輸入選項">
                        <button mat-icon-button matSuffix color="warn" 
                                (click)="deleteOption(question, $index)"
                                [disabled]="question.options.length <= 2">
                          <mat-icon>remove_circle</mat-icon>
                        </button>
                      </mat-form-field>
                    </div>
                  }
                  
                  <button mat-stroked-button color="primary" 
                          (click)="addOption(question)" class="add-option-btn">
                    <mat-icon>add</mat-icon>
                    添加選項
                  </button>
                </div>
              }

              <mat-checkbox [(ngModel)]="question.required" color="primary">
                必填題目
              </mat-checkbox>
            </mat-card-content>

            <mat-card-actions align="end">
              <button mat-icon-button color="warn" (click)="deleteQuestion(question.id)"
                      matTooltip="刪除問題">
                <mat-icon>delete</mat-icon>
              </button>
            </mat-card-actions>
          </mat-card>
        }
>>>>>>> b5099c3 (Initial commit with all files)
      </div>

      <div class="add-question-section">
        <button mat-raised-button color="primary" (click)="addQuestion()">
          <mat-icon>add</mat-icon>
          添加問題
        </button>
      </div>
    </div>
  `,
  styles: [`
    .questionnaire-form {
      padding: 24px;
      max-width: 800px;
      margin: 0 auto;
    }

    .header-card {
      margin-bottom: 24px;
    }

    .header-card mat-card-actions {
      padding: 16px;
      gap: 12px;
    }

    .form-card {
      margin-bottom: 24px;
    }

    .full-width {
      width: 100%;
    }

    .questions-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .question-card {
      position: relative;
      background: #fff;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 16px;
    }

    .drag-handle {
      position: absolute;
      top: 8px;
      left: 8px;
      cursor: move;
      color: #757575;
    }

    .question-header {
      display: flex;
      gap: 16px;
      margin-left: 32px;
    }

    .question-title {
      flex: 1;
    }

    .question-type {
      width: 120px;
    }

    .options-list {
      margin: 16px 0;
    }

    .option-item {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .option-input {
      flex: 1;
    }

    .add-option-btn {
      margin-top: 8px;
    }

    .add-question-section {
      margin-top: 24px;
      text-align: center;
    }

    .cdk-drag-preview {
      box-sizing: border-box;
      border-radius: 4px;
      box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2),
                  0 8px 10px 1px rgba(0, 0, 0, 0.14),
                  0 3px 14px 2px rgba(0, 0, 0, 0.12);
    }

    .cdk-drag-placeholder {
      opacity: 0;
    }

    .cdk-drag-animating {
      transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
    }

    .questions-list.cdk-drop-list-dragging .question-card:not(.cdk-drag-placeholder) {
      transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
    }
  `]
})
export class QuestionnaireFormComponent implements OnInit {
  isEditing = false;
  title = '';
  description = '';
  questions: Question[] = [];
  private nextQuestionId = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.loadQuestionnaire(id);
    }
  }

  loadQuestionnaire(id: string) {
    // TODO: Implement API call
    // For now, using mock data
    this.title = '示例問卷';
    this.description = '這是一個示例問卷的描述';
    this.questions = [
      {
        id: this.nextQuestionId++,
        type: 'text',
        title: '您的姓名是？',
        required: true,
        options: []
      },
      {
        id: this.nextQuestionId++,
        type: 'radio',
        title: '您的性別是？',
        options: ['男', '女', '不願透露'],
        required: true
      }
    ];
  }

  addQuestion() {
    this.questions.push({
      id: this.nextQuestionId++,
      type: 'text',
      title: '',
      required: false,
      options: []
    });
  }

  deleteQuestion(id: number) {
    const index = this.questions.findIndex(q => q.id === id);
    if (index !== -1) {
      this.questions.splice(index, 1);
    }
  }

  addOption(question: Question) {
    question.options.push('');
  }

  deleteOption(question: Question, index: number) {
    if (question.options.length > 2) {
      question.options.splice(index, 1);
    }
  }

  onQuestionTypeChange(question: Question, newType: 'text' | 'radio' | 'checkbox' | 'textarea') {
    if (newType === 'radio' || newType === 'checkbox') {
      if (question.options.length < 2) {
        question.options = ['', ''];
      }
    } else {
      question.options = [];
    }
  }

  drop(event: CdkDragDrop<Question[]>) {
    moveItemInArray(this.questions, event.previousIndex, event.currentIndex);
  }

  saveAsDraft() {
    // TODO: Implement API call
    this.snackBar.open('問卷已保存為草稿', '關閉', { duration: 3000 });
  }

  publish() {
    if (this.validateForm()) {
      // TODO: Implement API call
      this.snackBar.open('問卷已發布', '關閉', { duration: 3000 });
      this.router.navigate(['/questionnaires']);
    }
  }

  private validateForm(): boolean {
    if (!this.title.trim()) {
      this.snackBar.open('請輸入問卷標題', '關閉', { duration: 3000 });
      return false;
    }

    if (this.questions.length === 0) {
      this.snackBar.open('請至少添加一個問題', '關閉', { duration: 3000 });
      return false;
    }

    for (const question of this.questions) {
      if (!question.title.trim()) {
        this.snackBar.open('請填寫所有問題的標題', '關閉', { duration: 3000 });
        return false;
      }

      if ((question.type === 'radio' || question.type === 'checkbox') && 
          question.options.length < 2) {
        this.snackBar.open('選擇題至少需要兩個選項', '關閉', { duration: 3000 });
        return false;
      }
    }

    return true;
  }
}
