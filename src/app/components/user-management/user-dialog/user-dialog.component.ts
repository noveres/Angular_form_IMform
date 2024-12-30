import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { IUser, UserRole, UserStatus, IUserCreateDTO, IUserUpdateDTO } from '../../../interfaces/user.interface';

@Component({
  selector: 'app-user-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  template: `
    <div class="user-dialog">
      <h2 mat-dialog-title>{{ isEdit ? '編輯用戶' : '新增用戶' }}</h2>
      
      <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
        <mat-dialog-content>
          <!-- 基本信息 -->
          <div class="form-section">
            <h3>基本信息</h3>
            
            <mat-form-field appearance="outline">
              <mat-label>用戶名</mat-label>
              <input matInput formControlName="username" placeholder="輸入用戶名">
              <mat-error *ngIf="userForm.get('username')?.errors?.['required']">
                用戶名為必填項
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>電子郵件</mat-label>
              <input matInput formControlName="email" placeholder="輸入電子郵件">
              <mat-error *ngIf="userForm.get('email')?.errors?.['required']">
                電子郵件為必填項
              </mat-error>
              <mat-error *ngIf="userForm.get('email')?.errors?.['email']">
                請輸入有效的電子郵件地址
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>角色</mat-label>
              <mat-select formControlName="role">
                <mat-option [value]="UserRole.ADMIN">管理員</mat-option>
                <mat-option [value]="UserRole.MANAGER">經理</mat-option>
                <mat-option [value]="UserRole.USER">普通用戶</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline" *ngIf="isEdit">
              <mat-label>狀態</mat-label>
              <mat-select formControlName="status">
                <mat-option [value]="UserStatus.ACTIVE">啟用</mat-option>
                <mat-option [value]="UserStatus.INACTIVE">停用</mat-option>
                <mat-option [value]="UserStatus.SUSPENDED">凍結</mat-option>
              </mat-select>
            </mat-form-field>
          </div>

          <!-- 個人資料 -->
          <div class="form-section" formGroupName="profile">
            <h3>個人資料</h3>
            
            <mat-form-field appearance="outline">
              <mat-label>全名</mat-label>
              <input matInput formControlName="fullName" placeholder="輸入全名">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>電話號碼</mat-label>
              <input matInput formControlName="phoneNumber" placeholder="輸入電話號碼">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>部門</mat-label>
              <input matInput formControlName="department" placeholder="輸入部門">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>職位</mat-label>
              <input matInput formControlName="position" placeholder="輸入職位">
            </mat-form-field>
          </div>

          <!-- 設置 -->
          <div class="form-section" formGroupName="settings" *ngIf="isEdit">
            <h3>用戶設置</h3>
            
            <mat-form-field appearance="outline">
              <mat-label>語言</mat-label>
              <mat-select formControlName="language">
                <mat-option value="zh">中文</mat-option>
                <mat-option value="en">English</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>主題</mat-label>
              <mat-select formControlName="theme">
                <mat-option value="light">淺色</mat-option>
                <mat-option value="dark">深色</mat-option>
              </mat-select>
            </mat-form-field>
          </div>
        </mat-dialog-content>

        <mat-dialog-actions align="end">
          <button mat-button mat-dialog-close>取消</button>
          <button mat-raised-button color="primary" type="submit" [disabled]="!userForm.valid">
            {{ isEdit ? '更新' : '創建' }}
          </button>
        </mat-dialog-actions>
      </form>
    </div>
  `,
  styles: [`
    .user-dialog {
      min-width: 400px;
      max-width: 600px;
    }

    .form-section {
      margin-bottom: 24px;

      h3 {
        margin: 0 0 16px 0;
        color: #666;
        font-size: 16px;
      }
    }

    mat-form-field {
      width: 100%;
      margin-bottom: 16px;
    }

    mat-dialog-content {
      max-height: 70vh;
      overflow-y: auto;
    }

    mat-dialog-actions {
      padding: 16px 0;
    }
  `]
})
export class UserDialogComponent implements OnInit {
  userForm: FormGroup;
  isEdit: boolean;
  UserRole = UserRole;
  UserStatus = UserStatus;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user?: IUser }
  ) {
    this.isEdit = !!data.user;
    this.userForm = this.createForm();
  }

  ngOnInit() {
    if (this.isEdit && this.data.user) {
      this.userForm.patchValue(this.data.user);
    }
  }

  private createForm(): FormGroup {
    return this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      role: [UserRole.USER, Validators.required],
      status: [{ value: UserStatus.ACTIVE, disabled: !this.isEdit }],
      profile: this.fb.group({
        fullName: [''],
        phoneNumber: [''],
        department: [''],
        position: ['']
      }),
      settings: this.fb.group({
        language: ['zh'],
        theme: ['light']
      })
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const formValue = this.userForm.value;
      
      if (this.isEdit) {
        const updateDTO: IUserUpdateDTO = {
          username: formValue.username,
          email: formValue.email,
          role: formValue.role,
          status: formValue.status,
          profile: formValue.profile,
          settings: formValue.settings
        };
        this.dialogRef.close(updateDTO);
      } else {
        const createDTO: IUserCreateDTO = {
          username: formValue.username,
          email: formValue.email,
          role: formValue.role,
          profile: formValue.profile
        };
        this.dialogRef.close(createDTO);
      }
    }
  }
}
