import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface FormAnalytics {
  completionTime: number;  // 填寫時長（秒）
  selectionTypes: { [key: string]: number };  // 選擇類型分布
  completionRate: number;  // 完成率
}

export interface UserSegment {
  id: string;
  name: string;
  preferredChoices: string[];
  avgCompletionTime: number;
  completionRate: number;
  occupation: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserAnalyticsService {
  constructor() { }

  // 分析表單填寫時長
  analyzeFormCompletionTime(startTime: Date, endTime: Date): number {
    return (endTime.getTime() - startTime.getTime()) / 1000;
  }

  // 分析選擇類型分布
  analyzeSelectionDistribution(selections: any[]): { [key: string]: number } {
    const distribution: { [key: string]: number } = {};
    selections.forEach(selection => {
      distribution[selection.type] = (distribution[selection.type] || 0) + 1;
    });
    return distribution;
  }

  // 計算表單完成率
  calculateCompletionRate(totalFields: number, completedFields: number): number {
    return (completedFields / totalFields) * 100;
  }

  // 根據用戶行為進行分群
  segmentUsers(users: any[]): UserSegment[] {
    // 實現用戶分群邏輯
    return users.map(user => ({
      id: user.id,
      name: user.name,
      preferredChoices: this.analyzePreferredChoices(user.selections),
      avgCompletionTime: this.calculateAverageCompletionTime(user.forms),
      completionRate: this.calculateUserCompletionRate(user.forms),
      occupation: user.occupation
    }));
  }

  private analyzePreferredChoices(selections: any[]): string[] {
    // 分析用戶偏好選擇
    const preferences: { [key: string]: number } = {};
    selections.forEach(selection => {
      preferences[selection] = (preferences[selection] || 0) + 1;
    });
    return Object.entries(preferences)
      .sort(([,a], [,b]) => b - a)
      .map(([choice]) => choice)
      .slice(0, 3);  // 返回前三偏好
  }

  private calculateAverageCompletionTime(forms: any[]): number {
    if (!forms.length) return 0;
    const totalTime = forms.reduce((sum, form) => 
      sum + this.analyzeFormCompletionTime(new Date(form.startTime), new Date(form.endTime)), 0);
    return totalTime / forms.length;
  }

  private calculateUserCompletionRate(forms: any[]): number {
    if (!forms.length) return 0;
    const totalRate = forms.reduce((sum, form) => 
      sum + this.calculateCompletionRate(form.totalFields, form.completedFields), 0);
    return totalRate / forms.length;
  }
}
