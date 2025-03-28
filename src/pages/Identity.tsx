import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import IdentityList, { type Identity, IdentityState } from '@/components/identity/IdentityList';
import IdentityDetails from '@/components/identity/IdentityDetails';
import IdentityRoles, { Role, Permission } from '@/components/identity/IdentityRoles';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

const Identity = () => {
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const tabFromQuery = queryParams.get('tab');
  
  const [activeTab, setActiveTab] = useState(tabFromQuery || 'current');
  const [selectedIdentity, setSelectedIdentity] = useState<Identity | null>(null);

  useEffect(() => {
    if (tabFromQuery && ['current', 'pending', 'roles'].includes(tabFromQuery)) {
      setActiveTab(tabFromQuery);
    }
  }, [tabFromQuery]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`/identity?tab=${value}`, { replace: true });
  };

  const [identities, setIdentities] = useState<Identity[]>([
    {
      id: '1',
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@example.com',
      identityNumber: 'ID123456789',
      state: 'approved',
      address: '123 Main St, Anytown, CA 90210',
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      profilePicture: 'https://i.pravatar.cc/150?img=1'
    },
    {
      id: '2',
      firstName: 'Emily',
      lastName: 'Johnson',
      email: 'emily.j@example.com',
      identityNumber: 'ID987654321',
      state: 'pending',
      address: '456 Elm St, Othertown, NY 10001',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      profilePicture: 'https://i.pravatar.cc/150?img=5'
    },
    {
      id: '3',
      firstName: 'Michael',
      lastName: 'Davis',
      email: 'm.davis@example.com',
      identityNumber: 'ID567890123',
      state: 'rejected',
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    },
    {
      id: '4',
      firstName: 'Sarah',
      lastName: 'Wilson',
      email: 'sarah.w@example.com',
      identityNumber: 'ID345678912',
      state: 'compromised',
      address: '789 Oak St, Sometown, TX 75001',
      createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
      profilePicture: 'https://i.pravatar.cc/150?img=10'
    },
    {
      id: '5',
      firstName: 'David',
      lastName: 'Brown',
      email: 'd.brown@example.com',
      identityNumber: 'ID654321789',
      state: 'obsoleted',
      createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
    },
    {
      id: '6',
      firstName: 'Jessica',
      lastName: 'Miller',
      email: 'j.miller@example.com',
      identityNumber: 'ID234567891',
      state: 'pending',
      address: '321 Pine St, Anothertown, FL 33101',
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      profilePicture: 'https://i.pravatar.cc/150?img=20'
    }
  ]);

  const [permissions, setPermissions] = useState<Permission[]>([
    { id: 'perm_1', name: 'Read Identities', description: 'View identity information' },
    { id: 'perm_2', name: 'Create Identities', description: 'Create new identities' },
    { id: 'perm_3', name: 'Update Identities', description: 'Update existing identities' },
    { id: 'perm_4', name: 'Delete Identities', description: 'Delete identities from the system' },
    { id: 'perm_5', name: 'Approve Identities', description: 'Approve pending identities' },
    { id: 'perm_6', name: 'Reject Identities', description: 'Reject pending identities' },
    { id: 'perm_7', name: 'Manage API Keys', description: 'Create, view and revoke API keys' },
    { id: 'perm_8', name: 'Configure KYC', description: 'Configure KYC settings' },
    { id: 'perm_9', name: 'Manage Roles', description: 'Create and manage roles' }
  ]);

  const [roles, setRoles] = useState<Role[]>([
    { 
      id: 'role_1', 
      name: 'Admin', 
      description: 'Full system access', 
      permissions: ['perm_1', 'perm_2', 'perm_3', 'perm_4', 'perm_5', 'perm_6', 'perm_7', 'perm_8', 'perm_9'],
      isSystem: true
    },
    { 
      id: 'role_2', 
      name: 'Manager', 
      description: 'Can manage identities but not system settings', 
      permissions: ['perm_1', 'perm_2', 'perm_3', 'perm_5', 'perm_6']
    },
    { 
      id: 'role_3', 
      name: 'Reader', 
      description: 'Read-only access to identities', 
      permissions: ['perm_1'],
      isDefault: true
    }
  ]);

  const handleUpdateIdentityState = (identity: Identity, newState: IdentityState) => {
    setIdentities(prev => 
      prev.map(item => 
        item.id === identity.id ? { ...item, state: newState } : item
      )
    );

    toast({
      title: "Identity state updated",
      description: `${identity.firstName} ${identity.lastName}'s identity is now ${newState}`,
    });
    
    if (selectedIdentity?.id === identity.id) {
      setSelectedIdentity({ ...selectedIdentity, state: newState });
    }
  };

  const handleCreateRole = (role: Omit<Role, 'id'>) => {
    const newRole: Role = {
      ...role,
      id: `role_${Date.now()}`
    };
    
    setRoles(prev => [...prev, newRole]);
  };

  const handleUpdateRole = (id: string, roleUpdate: Partial<Role>) => {
    setRoles(prev => 
      prev.map(role => 
        role.id === id ? { ...role, ...roleUpdate } : role
      )
    );
  };

  const handleDeleteRole = (id: string) => {
    setRoles(prev => prev.filter(role => role.id !== id));
  };

  const currentIdentities = identities.filter(id => id.state !== 'pending');
  const pendingIdentities = identities.filter(id => id.state === 'pending');

  console.log("Rendering Identity Management page", { 
    identitiesCount: identities.length,
    selectedIdentity,
    activeTab,
    tabFromQuery
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight pb-1">Identity Management</h1>
          <p className="text-muted-foreground">
            Manage identity verification and roles
          </p>
        </div>

        {selectedIdentity ? (
          <IdentityDetails 
            identity={selectedIdentity}
            onBack={() => setSelectedIdentity(null)}
            onUpdateState={handleUpdateIdentityState}
          />
        ) : (
          <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="current">Current IDs</TabsTrigger>
              <TabsTrigger value="pending">Pending Applications</TabsTrigger>
              <TabsTrigger value="roles">Identity Roles</TabsTrigger>
            </TabsList>
            
            <TabsContent value="current" className="space-y-4 animate-fade-in">
              <IdentityList 
                identities={currentIdentities}
                onUpdateState={handleUpdateIdentityState}
                onView={setSelectedIdentity}
              />
            </TabsContent>
            
            <TabsContent value="pending" className="space-y-4 animate-fade-in">
              <IdentityList 
                identities={pendingIdentities}
                onUpdateState={handleUpdateIdentityState}
                onView={setSelectedIdentity}
              />
            </TabsContent>
            
            <TabsContent value="roles" className="space-y-4 animate-fade-in">
              <IdentityRoles 
                roles={roles}
                permissions={permissions}
                onCreateRole={handleCreateRole}
                onUpdateRole={handleUpdateRole}
                onDeleteRole={handleDeleteRole}
              />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Identity;
