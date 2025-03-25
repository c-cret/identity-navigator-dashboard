
export interface Account {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  hasIdentity: boolean;
  identityStatus?: 'pending' | 'approved' | 'rejected' | 'compromised' | 'obsoleted';
  createdAt: Date;
  lastLogin?: Date;
  avatar?: string;
  status?: 'active' | 'inactive' | 'suspended';
}

export interface Identity {
  id: string;
  accountId: string;
  firstName: string;
  lastName: string;
  identityNumber: string;
  state: 'pending' | 'approved' | 'rejected' | 'compromised' | 'obsoleted';
  address?: string;
  email?: string;
  createdAt: Date;
  profilePicture?: string;
  additionalFields?: Record<string, string>;
}

export interface OldIdentity {
  id: string;
  accountId: string;
  firstName: string;
  lastName: string;
  identityNumber: string;
  state: 'obsoleted' | 'compromised' | 'rejected';
  createdAt: Date;
  expiredAt: Date;
  reason: string;
  profilePicture?: string;
}

export interface ActivityItem {
  id: string;
  type: 'login' | 'contract' | 'identity' | string;
  description: string;
  timestamp: Date;
  ipAddress?: string;
  device?: string;
  documentId?: string;
}
