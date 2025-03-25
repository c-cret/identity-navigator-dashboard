
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import AccountInfo from '@/components/accounts/AccountInfo';
import AccountIdentity from '@/components/accounts/AccountIdentity';
import AccountHistory from '@/components/accounts/AccountHistory';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import type { Account, Identity, ActivityItem, OldIdentity } from '@/types/account';

// Mock data - in a real app this would come from an API
const mockAccounts: Record<string, Account> = {
  '1': {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phoneNumber: '+1 (555) 123-4567',
    hasIdentity: true,
    identityStatus: 'approved',
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    lastLogin: new Date(Date.now() - 1 * 60 * 60 * 1000),
    avatar: 'https://i.pravatar.cc/150?img=1',
    status: 'active'
  },
  '2': {
    id: '2',
    name: 'Emily Johnson',
    email: 'emily.j@example.com',
    phoneNumber: '+1 (555) 987-6543',
    hasIdentity: true,
    identityStatus: 'pending',
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    lastLogin: new Date(Date.now() - 24 * 60 * 60 * 1000),
    avatar: 'https://i.pravatar.cc/150?img=5',
    status: 'active'
  },
  '3': {
    id: '3',
    name: 'Michael Davis',
    email: 'm.davis@example.com',
    phoneNumber: '+1 (555) 234-5678',
    hasIdentity: false,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    status: 'active'
  },
  '4': {
    id: '4',
    name: 'Lisa Wang',
    email: 'lisa.wang@example.com',
    phoneNumber: '+1 (555) 456-7890',
    hasIdentity: true,
    identityStatus: 'rejected',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000),
    avatar: 'https://i.pravatar.cc/150?img=10',
    status: 'active'
  },
  '5': {
    id: '5',
    name: 'Robert Chen',
    email: 'r.chen@example.com',
    phoneNumber: '+1 (555) 567-8901',
    hasIdentity: true,
    identityStatus: 'compromised',
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
    lastLogin: new Date(Date.now() - 12 * 60 * 60 * 1000),
    avatar: 'https://i.pravatar.cc/150?img=12',
    status: 'active'
  },
  '6': {
    id: '6',
    name: 'Sarah Miller',
    email: 's.miller@example.com',
    phoneNumber: '+1 (555) 678-9012',
    hasIdentity: false,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    lastLogin: new Date(Date.now() - 36 * 60 * 60 * 1000),
    status: 'inactive'
  },
  '7': {
    id: '7',
    name: 'David Williams',
    email: 'd.williams@example.com',
    phoneNumber: '+1 (555) 789-0123',
    hasIdentity: false,
    createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
    lastLogin: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
    status: 'inactive'
  }
};

const mockIdentities: Record<string, Identity> = {
  '1': {
    id: 'identity1',
    accountId: '1',
    firstName: 'John',
    lastName: 'Smith',
    identityNumber: 'ID123456789',
    state: 'approved',
    address: '123 Main St, New York, NY 10001',
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    profilePicture: 'https://i.pravatar.cc/150?img=1',
    additionalFields: {
      dateOfBirth: '1985-05-15',
      nationality: 'US'
    }
  },
  '2': {
    id: 'identity2',
    accountId: '2',
    firstName: 'Emily',
    lastName: 'Johnson',
    identityNumber: 'ID987654321',
    state: 'pending',
    address: '456 Oak Ave, San Francisco, CA 94102',
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    profilePicture: 'https://i.pravatar.cc/150?img=5',
    additionalFields: {
      dateOfBirth: '1990-12-10',
      nationality: 'US'
    }
  },
  '4': {
    id: 'identity4',
    accountId: '4',
    firstName: 'Lisa',
    lastName: 'Wang',
    identityNumber: 'ID456789123',
    state: 'rejected',
    address: '789 Pine St, Seattle, WA 98101',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    profilePicture: 'https://i.pravatar.cc/150?img=10',
    additionalFields: {
      dateOfBirth: '1988-03-25',
      nationality: 'US'
    }
  },
  '5': {
    id: 'identity5',
    accountId: '5',
    firstName: 'Robert',
    lastName: 'Chen',
    identityNumber: 'ID789123456',
    state: 'compromised',
    address: '101 Cedar Blvd, Austin, TX 78701',
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
    profilePicture: 'https://i.pravatar.cc/150?img=12',
    additionalFields: {
      dateOfBirth: '1975-08-05',
      nationality: 'US'
    }
  }
};

// Mock old identity records
const mockOldIdentities: Record<string, OldIdentity[]> = {
  '1': [
    {
      id: 'old-identity1',
      accountId: '1',
      firstName: 'John',
      lastName: 'Smith',
      identityNumber: 'ID123456789-OLD',
      state: 'obsoleted',
      createdAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000),
      expiredAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      reason: 'Identity document renewed'
    }
  ],
  '5': [
    {
      id: 'old-identity5-1',
      accountId: '5',
      firstName: 'Robert',
      lastName: 'Chen',
      identityNumber: 'ID789123456-OLD1',
      state: 'obsoleted',
      createdAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
      expiredAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000),
      reason: 'Address change'
    },
    {
      id: 'old-identity5-2',
      accountId: '5',
      firstName: 'Robert',
      lastName: 'Chen',
      identityNumber: 'ID789123456-OLD2',
      state: 'compromised',
      createdAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000),
      expiredAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
      reason: 'Security breach'
    }
  ]
};

// Mock account activity
const mockAccountActivities: Record<string, ActivityItem[]> = {
  '1': [
    {
      id: 'act1-1',
      type: 'login',
      description: 'Logged in from New York, NY',
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      ipAddress: '192.168.1.1',
      device: 'Chrome on Windows'
    },
    {
      id: 'act1-2',
      type: 'contract',
      description: 'Signed rental agreement #1234',
      documentId: 'doc-1234',
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      ipAddress: '192.168.1.1',
      device: 'Chrome on Windows'
    },
    {
      id: 'act1-3',
      type: 'identity',
      description: 'Identity verified and approved',
      timestamp: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      ipAddress: '192.168.1.1',
      device: 'Chrome on Windows'
    }
  ],
  '2': [
    {
      id: 'act2-1',
      type: 'login',
      description: 'Logged in from San Francisco, CA',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      ipAddress: '192.168.2.2',
      device: 'Safari on macOS'
    },
    {
      id: 'act2-2',
      type: 'identity',
      description: 'Identity submission pending review',
      timestamp: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      ipAddress: '192.168.2.2',
      device: 'Safari on macOS'
    }
  ],
  '4': [
    {
      id: 'act4-1',
      type: 'login',
      description: 'Logged in from Seattle, WA',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      ipAddress: '192.168.4.4',
      device: 'Firefox on Linux'
    },
    {
      id: 'act4-2',
      type: 'identity',
      description: 'Identity rejected - unclear document',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      ipAddress: '192.168.4.4',
      device: 'Firefox on Linux'
    }
  ],
  '5': [
    {
      id: 'act5-1',
      type: 'login',
      description: 'Logged in from Austin, TX',
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      ipAddress: '192.168.5.5',
      device: 'Chrome on Android'
    },
    {
      id: 'act5-2',
      type: 'contract',
      description: 'Signed employment contract #5678',
      documentId: 'doc-5678',
      timestamp: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      ipAddress: '192.168.5.5',
      device: 'Chrome on Android'
    },
    {
      id: 'act5-3',
      type: 'identity',
      description: 'Identity marked as compromised',
      timestamp: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
      ipAddress: '192.168.5.5',
      device: 'Chrome on Android'
    }
  ],
  '6': [
    {
      id: 'act6-1',
      type: 'login',
      description: 'Last login from Chicago, IL',
      timestamp: new Date(Date.now() - 36 * 60 * 60 * 1000),
      ipAddress: '192.168.6.6',
      device: 'Safari on iOS'
    }
  ]
};

const AccountDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // Check if there's a tab in the URL query parameters
  const queryParams = new URLSearchParams(location.search);
  const tabFromQuery = queryParams.get('tab');
  
  const [activeTab, setActiveTab] = useState(tabFromQuery || 'details');

  useEffect(() => {
    if (tabFromQuery) {
      setActiveTab(tabFromQuery);
    }
  }, [tabFromQuery]);

  const account = id ? mockAccounts[id] : undefined;
  const identity = account?.hasIdentity && id ? mockIdentities[id] : undefined;
  const oldIdentities = id ? mockOldIdentities[id] || [] : [];
  const accountActivities = id ? mockAccountActivities[id] || [] : [];

  if (!account) {
    return (
      <DashboardLayout>
        <div className="text-center py-10">
          <h2 className="text-xl font-medium mb-4">Account not found</h2>
          <Button 
            variant="outline" 
            onClick={() => navigate('/accounts')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Accounts
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const handleUpdateAccount = (updatedAccount: Partial<Account>) => {
    toast({
      title: "Account Updated",
      description: `${account.name}'s information has been updated`,
    });
  };

  const handleUpdateIdentity = (updatedIdentity: Partial<Identity>) => {
    toast({
      title: "Identity Updated",
      description: `${account.name}'s identity has been updated`,
    });
  };

  const handleCreateIdentity = () => {
    toast({
      title: "Identity Created",
      description: `A new identity has been created for ${account.name}`,
    });
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`/accounts/${id}?tab=${value}`, { replace: true });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate('/accounts')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight pb-1">
              {account.name}
            </h1>
            <p className="text-muted-foreground">{account.email}</p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
          <TabsList>
            <TabsTrigger value="details">Account Details</TabsTrigger>
            <TabsTrigger value="identity">Identity</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="space-y-4 animate-fade-in">
            <AccountInfo 
              account={account}
              onUpdateAccount={handleUpdateAccount}
            />
          </TabsContent>
          
          <TabsContent value="identity" className="space-y-4 animate-fade-in">
            <AccountIdentity 
              identity={identity}
              account={account}
              oldIdentities={oldIdentities}
              onUpdateIdentity={handleUpdateIdentity}
              onCreateIdentity={handleCreateIdentity}
            />
          </TabsContent>

          <TabsContent value="history" className="space-y-4 animate-fade-in">
            <AccountHistory 
              account={account}
              activities={accountActivities}
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AccountDetail;
