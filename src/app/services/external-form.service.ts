import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  ExternalForm,
  ExternalFormResponse,
  ExternalFormFilters,
  FormType
} from '../interfaces/external-form.interface';

@Injectable({
  providedIn: 'root'
})
export class ExternalFormService {
  private apiUrl = '/api/external-forms';

  constructor(private http: HttpClient) {}

  getForms(filters: ExternalFormFilters): Observable<ExternalFormResponse> {
    // 模擬數據
    const mockForms: ExternalForm[] = [
      {
        id: '1',
        type: 'Tapy1',
        name: '張三',
        status: 'pending',
        submitDate: new Date('2024-01-01')
      },
      {
        id: '2',
        type: 'Tapy2',
        name: '李四',
        status: 'processing',
        submitDate: new Date('2024-01-02')
      },
      {
        id: '3',
        type: 'Tapy3',
        name: '王五',
        status: 'completed',
        submitDate: new Date('2024-01-03')
      },
      {
        id: '4',
        type: 'Tapy4',
        name: '趙六',
        status: 'pending',
        submitDate: new Date('2024-01-04')
      }
    ];

    // 根據篩選條件過濾數據
    let filteredForms = mockForms;
    
    if (filters.type) {
      filteredForms = filteredForms.filter(form => form.type === filters.type);
    }
    if (filters.name) {
      filteredForms = filteredForms.filter(form => 
        form.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }
    if (filters.id) {
      filteredForms = filteredForms.filter(form => 
        form.id.toLowerCase().includes(filters.id.toLowerCase())
      );
    }
    if (filters.status) {
      filteredForms = filteredForms.filter(form => form.status === filters.status);
    }
    if (filters.startDate) {
      const startDate = filters.startDate;
      filteredForms = filteredForms.filter(form => 
        form.submitDate >= startDate
      );
    }
    if (filters.endDate) {
      const endDate = filters.endDate;
      filteredForms = filteredForms.filter(form => 
        form.submitDate <= endDate
      );
    }

    return of({
      forms: filteredForms,
      total: filteredForms.length
    });
  }

  getFormById(id: string): Observable<ExternalForm> {
    // 模擬單個表單數據
    const mockForm: ExternalForm = {
      id: id,
      type: 'Tapy1',
      name: '張三',
      status: 'pending',
      submitDate: new Date()
    };
    return of(mockForm);
  }

  updateForm(id: string, formData: Partial<ExternalForm>): Observable<ExternalForm> {
    return this.getFormById(id).pipe(
      map((existingForm: ExternalForm) => ({
        ...existingForm,
        ...formData
      }))
    );
  }

  updateFormStatus(id: string, status: 'pending' | 'processing' | 'completed'): Observable<ExternalForm> {
    return this.getFormById(id).pipe(
      map((existingForm: ExternalForm) => ({
        ...existingForm,
        status
      }))
    );
  }

  deleteForm(id: string): Observable<void> {
    return of(void 0);
  }

  importFormData(data: any): Observable<ExternalForm> {
    const validTypes: FormType[] = ['Tapy1', 'Tapy2', 'Tapy3', 'Tapy4'];
    const type = validTypes.includes(data.type) ? data.type as FormType : 'Tapy1';
    
    const mockForm: ExternalForm = {
      id: Math.random().toString(36).substr(2, 9),
      type: type,
      name: data.name || 'Unknown',
      status: 'pending',
      submitDate: new Date()
    };
    return of(mockForm);
  }

  exportFormData(id: string): Observable<Blob> {
    return this.getFormById(id).pipe(
      map((form: ExternalForm) => new Blob([JSON.stringify(form)], { type: 'application/json' }))
    );
  }

  getFormStatistics(id: string): Observable<ExternalForm> {
    return this.getFormById(id);
  }

  getTypeText(type: FormType): string {
    const typeTexts: Record<FormType, string> = {
      'Tapy1': 'BRAVE',
      'Tapy2': 'CAUTIOUS',
      'Tapy3': 'CLEVER',
      'Tapy4': 'KIND'
    };
    return typeTexts[type];
  }

  getTypeColor(type: FormType): string {
    const typeColors: Record<FormType, string> = {
      'Tapy1': '#FF4081', // 粉紅色
      'Tapy2': '#3F51B5', // 靛藍色
      'Tapy3': '#4CAF50', // 綠色
      'Tapy4': '#FFC107'  // 琥珀色
    };
    return typeColors[type];
  }
}
