import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { ExternalForm } from '../../../interfaces/external-form.interface';

@Component({
  selector: 'app-status-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule
  ],
  template: `
    <h2 mat-dialog-title>修改狀態</h2>
    <mat-dialog-content>
      <mat-form-field>
        <mat-label>狀態</mat-label>
        <mat-select [(ngModel)]="data.status">
          <mat-option value="pending">待處理</mat-option>
          <mat-option value="processing">處理中</mat-option>
          <mat-option value="completed">已完成</mat-option>
        </mat-select>
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">取消</button>
      <button mat-raised-button color="primary" (click)="onConfirm()">確認</button>
    </mat-dialog-actions>
  `,
  styles: [`
    mat-form-field {
      width: 100%;
      margin: 16px 0;
    }
  `]
})
export class StatusDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<StatusDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ExternalForm
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    this.dialogRef.close(this.data.status);
  }
}
