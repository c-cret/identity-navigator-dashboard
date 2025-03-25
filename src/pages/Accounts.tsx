
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import AccountList from '@/components/accounts/AccountList';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';
import type { Account } from '@/types/account';

const Accounts = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

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

  const handleViewAccount = (account: Account) => {
    navigate(`/accounts/${account.id}`);
  };

  const handleAddAccount = () => {
    toast({
      title: "Add Account",
      description: "Feature to add a new account would go here",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight pb-1">Accounts</h1>
            <p className="text-muted-foreground">
              Manage user accounts and identities
            </p>
          </div>
          <Button onClick={handleAddAccount}>
            <UserPlus className="h-4 w-4 mr-2" />
            Add Account
          </Button>
        </div>

        <AccountList 
          accounts={accounts} 
          onView={handleViewAccount}
        />
      </div>
    </DashboardLayout>
  );
};

export default Accounts;
