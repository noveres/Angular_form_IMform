import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { ExternalFormService } from '../../services/external-form.service';
import { ExternalForm, ExternalFormFilters, FormType } from '../../interfaces/external-form.interface';
import { StatusDialogComponent } from './status-dialog/status-dialog.component';

@Component({
  selector: 'app-external-forms',
  templateUrl: './external-forms.component.html',
  styleUrls: ['./external-forms.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    StatusDialogComponent
  ]
})
export class ExternalFormsComponent implements OnInit, OnDestroy {
  forms: ExternalForm[] = [];
  displayedColumns: string[] = ['type', 'name', 'id', 'status', 'submitDate', 'actions'];
  totalItems = 0;
  pageSize = 10;
  currentPage = 0;
  formTypes: FormType[] = ['Tapy1', 'Tapy2', 'Tapy3', 'Tapy4'];
  
  filters: ExternalFormFilters = {
    type: null,
    name: '',
    id: '',
    status: null,
    startDate: null,
    endDate: null
  };

  private destroy$ = new Subject<void>();
  private nameChangeSubject = new Subject<string>();
  private idChangeSubject = new Subject<string>();

  constructor(
    public externalFormService: ExternalFormService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    // 設置姓名搜尋的延遲
    this.nameChangeSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.applyFilters();
    });

    // 設置ID搜尋的延遲
    this.idChangeSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.applyFilters();
    });
  }

  ngOnInit() {
    this.loadForms();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onNameChange(value: string) {
    this.nameChangeSubject.next(value);
  }

  onIdChange(value: string) {
    this.idChangeSubject.next(value);
  }

  loadForms() {
    this.externalFormService.getForms(this.filters)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.forms = response.forms;
          this.totalItems = response.total;
        },
        error: (error) => {
          this.snackBar.open('載入表單失敗', '關閉', { duration: 3000 });
          console.error('Error loading forms:', error);
        }
      });
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadForms();
  }

  applyFilters() {
    this.currentPage = 0;
    this.loadForms();
  }

  resetFilters() {
    this.filters = {
      type: null,
      name: '',
      id: '',
      status: null,
      startDate: null,
      endDate: null
    };
    this.applyFilters();
  }

  getTypeText(type: FormType): string {
    return this.externalFormService.getTypeText(type);
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'pending':
        return '待處理';
      case 'processing':
        return '處理中';
      case 'completed':
        return '已完成';
      default:
        return '未知';
    }
  }

  viewForm(form: ExternalForm) {
    // 實現查看表單的邏輯
  }

  editForm(form: ExternalForm) {
    // 實現編輯表單的邏輯
  }

  changeStatus(form: ExternalForm) {
    const dialogRef = this.dialog.open(StatusDialogComponent, {
      width: '300px',
      data: { ...form }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.externalFormService.updateFormStatus(form.id, result)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (updatedForm) => {
              const index = this.forms.findIndex(f => f.id === form.id);
              if (index !== -1) {
                this.forms[index] = updatedForm;
              }
              this.snackBar.open('狀態更新成功', '關閉', { duration: 3000 });
            },
            error: (error) => {
              this.snackBar.open('狀態更新失敗', '關閉', { duration: 3000 });
              console.error('Error updating form status:', error);
            }
          });
      }
    });
  }

  deleteForm(form: ExternalForm) {
    // 實現刪除表單的邏輯
  }
}
