
import { IdentityState } from '@/components/identity/IdentityList';

export interface Account {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  hasIdentity: boolean;
  identityStatus?: IdentityState;
  createdAt: Date;
  lastLogin?: Date;
  avatar?: string;
}

export interface Identity {
  id: string;
  accountId: string;
  firstName: string;
  lastName: string;
  identityNumber: string;
  state: IdentityState;
  address?: string;
  createdAt: Date;
  profilePicture?: string;
  additionalFields?: Record<string, string>;
}
