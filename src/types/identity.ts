
export enum IdentityStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  COMPROMISED = 'compromised',
  OBSOLETED = 'obsoleted'
}

export interface Account {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  hasIdentity: boolean;
  identityStatus?: IdentityStatus;
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
  state: IdentityStatus;
  address?: string;
  email?: string;
  phone?: string;
  createdAt: Date;
  profilePicture?: string;
  additionalFields?: Record<string, string>;
}
