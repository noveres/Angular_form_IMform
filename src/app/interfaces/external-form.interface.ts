export type FormType = 'Tapy1' | 'Tapy2' | 'Tapy3' | 'Tapy4';

export interface ExternalFormChoice {
  userId: string;
  username: string;
  choiceType: 'BRAVE' | 'CAUTIOUS' | 'CLEVER' | 'KIND' | 'NEUTRAL';
  timestamp: string;
}

export interface ExternalFormStatistics {
  BRAVE: number;
  CAUTIOUS: number;
  CLEVER: number;
  KIND: number;
  NEUTRAL: number;
}

export interface ExternalForm {
  id: string;
  type: FormType;
  name: string;
  status: 'pending' | 'processing' | 'completed';
  submitDate: Date;
}

export interface CreateExternalFormDTO {
  name: string;
  description?: string;
  status?: 'ACTIVE' | 'INACTIVE' | 'DRAFT';
  metadata?: {
    category?: string;
    tags?: string[];
    [key: string]: any;
  };
}

export interface UpdateExternalFormDTO extends Partial<CreateExternalFormDTO> {
  id: string;
}

export interface ExternalFormFilters {
  type: FormType | null;
  name: string;
  id: string;
  status: string | null;
  startDate: Date | null;
  endDate: Date | null;
}

export interface ExternalFormResponse {
  forms: ExternalForm[];
  total: number;
}
