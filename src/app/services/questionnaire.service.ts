import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

export interface Question {
  id: number;
  type: 'text' | 'radio' | 'checkbox' | 'textarea';
  title: string;
  options?: string[];
  required: boolean;
}

export interface Questionnaire {
  id: number;
  title: string;
  description: string;
  status: 'active' | 'draft' | 'closed';
  questions: Question[];
  responses: number;
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {
  private questionnaires: Questionnaire[] = [
    {
      id: 1,
      title: '顧客滿意度調查',
      description: '了解我們的服務品質和顧客滿意程度',
      status: 'active',
      questions: [
        {
          id: 1,
          type: 'radio',
          title: '整體而言，您對我們的服務滿意嗎？',
          options: ['非常滿意', '滿意', '普通', '不滿意', '非常不滿意'],
          required: true
        },
        {
          id: 2,
          type: 'textarea',
          title: '您有什麼建議可以幫助我們改進服務？',
          required: false
        }
      ],
      responses: 45,
      createdAt: '2024-12-24',
      updatedAt: '2024-12-24'
    },
    {
      id: 2,
      title: '產品反饋調查',
      description: '收集用戶對新產品的使用體驗和建議',
      status: 'draft',
      questions: [
        {
          id: 1,
          type: 'checkbox',
          title: '您使用過我們的哪些產品？（可多選）',
          options: ['產品A', '產品B', '產品C', '產品D'],
          required: true
        }
      ],
      responses: 0,
      createdAt: '2024-12-23',
      updatedAt: '2024-12-23'
    }
  ];

  private questionnairesSubject = new BehaviorSubject<Questionnaire[]>(this.questionnaires);

  getQuestionnaires(): Observable<Questionnaire[]> {
    return this.questionnairesSubject.asObservable().pipe(delay(500));
  }

  getQuestionnaireById(id: number): Observable<Questionnaire | undefined> {
    return this.questionnairesSubject.pipe(
      map(questionnaires => questionnaires.find(q => q.id === id)),
      delay(500)
    );
  }

  createQuestionnaire(questionnaire: Omit<Questionnaire, 'id' | 'createdAt' | 'updatedAt'>): Observable<Questionnaire> {
    const newQuestionnaire: Questionnaire = {
      ...questionnaire,
      id: this.questionnaires.length + 1,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      responses: 0
    };

    this.questionnaires.push(newQuestionnaire);
    this.questionnairesSubject.next(this.questionnaires);
    return of(newQuestionnaire).pipe(delay(500));
  }

  updateQuestionnaire(id: number, updates: Partial<Questionnaire>): Observable<Questionnaire> {
    const index = this.questionnaires.findIndex(q => q.id === id);
    if (index === -1) {
      throw new Error('Questionnaire not found');
    }

    const updatedQuestionnaire = {
      ...this.questionnaires[index],
      ...updates,
      updatedAt: new Date().toISOString().split('T')[0]
    };

    this.questionnaires[index] = updatedQuestionnaire;
    this.questionnairesSubject.next(this.questionnaires);
    return of(updatedQuestionnaire).pipe(delay(500));
  }

  deleteQuestionnaire(id: number): Observable<void> {
    this.questionnaires = this.questionnaires.filter(q => q.id !== id);
    this.questionnairesSubject.next(this.questionnaires);
    return of(void 0).pipe(delay(500));
  }
}
