
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import UserList from '@/components/users/UserList';
import UserCard from '@/components/users/UserCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserPlus, Grid, List } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import type { User } from '@/components/users/UserList';

const Users = () => {
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  // Mock user data
  const users: User[] = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@example.com',
      role: 'Admin',
      status: 'active',
      lastActive: new Date(Date.now() - 1 * 60 * 60 * 1000),
      avatar: 'https://i.pravatar.cc/150?img=1'
    },
    {
      id: '2',
      name: 'Emily Johnson',
      email: 'emily.j@example.com',
      role: 'User',
      status: 'active',
      lastActive: new Date(Date.now() - 24 * 60 * 60 * 1000),
      avatar: 'https://i.pravatar.cc/150?img=5'
    },
    {
      id: '3',
      name: 'Michael Davis',
      email: 'm.davis@example.com',
      role: 'User',
      status: 'inactive',
      lastActive: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    },
    {
      id: '4',
      name: 'Lisa Wang',
      email: 'lisa.wang@example.com',
      role: 'Editor',
      status: 'pending',
      lastActive: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      avatar: 'https://i.pravatar.cc/150?img=10'
    },
    {
      id: '5',
      name: 'Robert Chen',
      email: 'r.chen@example.com',
      role: 'User',
      status: 'active',
      lastActive: new Date(Date.now() - 12 * 60 * 60 * 1000),
      avatar: 'https://i.pravatar.cc/150?img=12'
    },
    {
      id: '6',
      name: 'Sarah Miller',
      email: 's.miller@example.com',
      role: 'Editor',
      status: 'active',
      lastActive: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    }
  ];

  // Handler for edit user
  const handleEditUser = (user: User) => {
    toast({
      title: "Edit user",
      description: `Editing user ${user.name}`,
    });
  };

  // Handler for delete user
  const handleDeleteUser = (user: User) => {
    toast({
      title: "Delete user",
      description: `${user.name} would be deleted`,
      variant: "destructive",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight pb-1">Users</h1>
            <p className="text-muted-foreground">
              Manage user accounts and permissions
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Tabs
              defaultValue="list"
              value={viewMode}
              onValueChange={(value) => setViewMode(value as 'list' | 'grid')}
              className="hidden sm:block"
            >
              <TabsList className="grid w-full grid-cols-2" style={{ width: "120px" }}>
                <TabsTrigger value="list">
                  <List className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="grid">
                  <Grid className="h-4 w-4" />
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </div>
        </div>

        {viewMode === 'list' ? (
          <UserList 
            users={users} 
            onEdit={handleEditUser} 
            onDelete={handleDeleteUser}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map((user, index) => (
              <UserCard 
                key={user.id} 
                user={user} 
                onEdit={handleEditUser} 
                onDelete={handleDeleteUser}
                className="animate-scale-in"
                style={{ animationDelay: `${index * 50}ms` }}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Users;
