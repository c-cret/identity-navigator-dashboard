
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import AccountList from '@/components/accounts/AccountList';
import IdentityApplicationsList from '@/components/accounts/IdentityApplicationsList';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Account, Identity } from '@/types/account';

const Accounts = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('accounts');

  // Mock accounts data
  const accounts: Account[] = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@example.com',
      phoneNumber: '+1 (555) 123-4567',
      hasIdentity: true,
      identityStatus: 'approved',
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
      lastLogin: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
      avatar: 'https://i.pravatar.cc/150?img=1'
    },
    {
      id: '2',
      name: 'Emily Johnson',
      email: 'emily.j@example.com',
      phoneNumber: '+1 (555) 987-6543',
      hasIdentity: true,
      identityStatus: 'pending',
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
      lastLogin: new Date(Date.now() - 24 * 60 * 60 * 1000), // 24 hours ago
      avatar: 'https://i.pravatar.cc/150?img=5'
    },
    {
      id: '3',
      name: 'Michael Davis',
      email: 'm.davis@example.com',
      phoneNumber: '+1 (555) 234-5678',
      hasIdentity: false,
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 7 days ago
    },
    {
      id: '4',
      name: 'Lisa Wang',
      email: 'lisa.wang@example.com',
      phoneNumber: '+1 (555) 456-7890',
      hasIdentity: true,
      identityStatus: 'rejected',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      avatar: 'https://i.pravatar.cc/150?img=10'
    },
    {
      id: '5',
      name: 'Robert Chen',
      email: 'r.chen@example.com',
      phoneNumber: '+1 (555) 567-8901',
      hasIdentity: true,
      identityStatus: 'compromised',
      createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000), // 45 days ago
      lastLogin: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
      avatar: 'https://i.pravatar.cc/150?img=12'
    },
    {
      id: '6',
      name: 'Sarah Miller',
      email: 's.miller@example.com',
      phoneNumber: '+1 (555) 678-9012',
      hasIdentity: false,
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      lastLogin: new Date(Date.now() - 36 * 60 * 60 * 1000) // 36 hours ago
    }
  ];

  // Mock identity applications (pending identities)
  const identityApplications: Identity[] = [
    {
      id: 'app1',
      accountId: '2',
      firstName: 'Emily',
      lastName: 'Johnson',
      identityNumber: 'ID987654321',
      state: 'pending',
      address: '456 Oak Ave, San Francisco, CA 94102',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      profilePicture: 'https://i.pravatar.cc/150?img=5',
    },
    {
      id: 'app2',
      accountId: '7',
      firstName: 'Thomas',
      lastName: 'Wilson',
      identityNumber: 'ID567891234',
      state: 'pending',
      address: '789 Pine St, Boston, MA 02108',
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
    {
      id: 'app3',
      accountId: '8',
      firstName: 'Olivia',
      lastName: 'Martinez',
      identityNumber: 'ID123789456',
      state: 'pending',
      address: '321 Cedar Ave, Chicago, IL 60601',
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      profilePicture: 'https://i.pravatar.cc/150?img=15',
    }
  ];

  const handleViewAccount = (account: Account) => {
    navigate(`/accounts/${account.id}`);
  };

  const handleAddAccount = () => {
    toast({
      title: "Add Account",
      description: "Feature to add a new account would go here",
    });
  };

  const handleViewIdentity = (identity: Identity) => {
    // Find the account associated with this identity
    const account = accounts.find(acc => acc.id === identity.accountId);
    if (account) {
      navigate(`/accounts/${account.id}?tab=identity`);
    } else {
      toast({
        title: "Error",
        description: "Could not find associated account",
        variant: "destructive"
      });
    }
  };

  const handleApproveIdentity = (identity: Identity) => {
    toast({
      title: "Identity Approved",
      description: `${identity.firstName} ${identity.lastName}'s identity has been approved`,
    });
  };

  const handleRejectIdentity = (identity: Identity) => {
    toast({
      title: "Identity Rejected",
      description: `${identity.firstName} ${identity.lastName}'s identity has been rejected`,
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight pb-1">Accounts</h1>
            <p className="text-muted-foreground">
              Manage user accounts and identity verifications
            </p>
          </div>
          <Button onClick={handleAddAccount}>
            <UserPlus className="h-4 w-4 mr-2" />
            Add Account
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="accounts">Accounts</TabsTrigger>
            <TabsTrigger value="applications">Identity Applications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="accounts" className="space-y-4 animate-fade-in">
            <AccountList 
              accounts={accounts} 
              onView={handleViewAccount}
            />
          </TabsContent>
          
          <TabsContent value="applications" className="space-y-4 animate-fade-in">
            <IdentityApplicationsList 
              applications={identityApplications}
              onView={handleViewIdentity}
              onApprove={handleApproveIdentity}
              onReject={handleRejectIdentity}
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Accounts;
