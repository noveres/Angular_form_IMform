export interface IUser {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
  profile?: {
    fullName?: string;
    phoneNumber?: string;
    address?: string;
    department?: string;
    position?: string;
  };
  settings?: {
    notifications?: boolean;
    language?: string;
    theme?: string;
  };
}

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  MANAGER = 'MANAGER'
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED'
}

export interface IUserCreateDTO {
  username: string;
  email: string;
  role: UserRole;
  profile?: {
    fullName?: string;
    phoneNumber?: string;
    address?: string;
    department?: string;
    position?: string;
  };
}

export interface IUserUpdateDTO {
  username?: string;
  email?: string;
  role?: UserRole;
  status?: UserStatus;
  profile?: {
    fullName?: string;
    phoneNumber?: string;
    address?: string;
    department?: string;
    position?: string;
  };
  settings?: {
    notifications?: boolean;
    language?: string;
    theme?: string;
  };
}
