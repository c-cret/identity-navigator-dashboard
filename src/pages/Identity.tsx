import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import IdentityList, { type Identity, IdentityState } from '@/components/identity/IdentityList';
import IdentityDetails from '@/components/identity/IdentityDetails';
import KYCSettingsForm, { KYCField } from '@/components/identity/KYCSettingsForm';
import ApiKeyManagement, { ApiKey } from '@/components/identity/ApiKeyManagement';
import IdentityRoles, { Role, Permission } from '@/components/identity/IdentityRoles';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

const Identity = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('current');
  const [selectedIdentity, setSelectedIdentity] = useState<Identity | null>(null);

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

  const [kycFields, setKycFields] = useState<KYCField[]>([
    { id: 'field_1', name: 'firstName', label: 'First Name', required: true, enabled: true, type: 'text' },
    { id: 'field_2', name: 'lastName', label: 'Last Name', required: true, enabled: true, type: 'text' },
    { id: 'field_3', name: 'identityNumber', label: 'Identity Number', required: true, enabled: true, type: 'text' },
    { id: 'field_4', name: 'email', label: 'Email Address', required: true, enabled: true, type: 'email' },
    { id: 'field_5', name: 'address', label: 'Address', required: false, enabled: true, type: 'text' },
    { id: 'field_6', name: 'dateOfBirth', label: 'Date of Birth', required: false, enabled: true, type: 'date' },
    { id: 'field_7', name: 'profilePicture', label: 'Profile Picture', required: false, enabled: true, type: 'file' }
  ]);

  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: 'key_1',
      name: 'Production API Key',
      key: 'sk_live_123456789012345678901234',
      role: 'admin',
      createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
      lastUsed: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: 'key_2',
      name: 'Development API Key',
      key: 'sk_test_123456789012345678901234',
      role: 'reader',
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      lastUsed: new Date(Date.now() - 24 * 60 * 60 * 1000)
    },
    {
      id: 'key_3',
      name: 'Integration Testing',
      key: 'sk_test_987654321098765432109876',
      role: 'manager',
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)
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

  const handleSaveKYCSettings = (fields: KYCField[]) => {
    setKycFields(fields);
  };

  const handleCreateApiKey = (name: string, role: string) => {
    const newKey: ApiKey = {
      id: `key_${Date.now()}`,
      name,
      key: `sk_live_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
      role,
      createdAt: new Date()
    };
    
    setApiKeys(prev => [...prev, newKey]);
    
    toast({
      title: "API key created",
      description: `The API key "${name}" has been created`,
    });
  };

  const handleDeleteApiKey = (id: string) => {
    setApiKeys(prev => prev.filter(key => key.id !== id));
  };

  const handleRegenerateApiKey = (id: string) => {
    setApiKeys(prev => 
      prev.map(key => 
        key.id === id 
          ? { 
              ...key, 
              key: `sk_live_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
              createdAt: new Date()
            } 
          : key
      )
    );
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

  const getAvailableRoles = () => roles.map(role => ({ id: role.id, name: role.name }));

  console.log("Rendering Identity Management page", { 
    identitiesCount: identities.length,
    selectedIdentity,
    activeTab
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight pb-1">Identity Management</h1>
          <p className="text-muted-foreground">
            Manage identity verification and API access
          </p>
        </div>

        {selectedIdentity ? (
          <IdentityDetails 
            identity={selectedIdentity}
            onBack={() => setSelectedIdentity(null)}
            onUpdateState={handleUpdateIdentityState}
          />
        ) : (
          <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-5 w-full">
              <TabsTrigger value="current">Current IDs</TabsTrigger>
              <TabsTrigger value="pending">Pending Applications</TabsTrigger>
              <TabsTrigger value="settings">KYC Settings</TabsTrigger>
              <TabsTrigger value="apikeys">API Keys</TabsTrigger>
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
            
            <TabsContent value="settings" className="space-y-4 animate-fade-in">
              <KYCSettingsForm 
                fields={kycFields}
                onSave={handleSaveKYCSettings}
              />
            </TabsContent>
            
            <TabsContent value="apikeys" className="space-y-4 animate-fade-in">
              <ApiKeyManagement 
                apiKeys={apiKeys}
                onCreateKey={handleCreateApiKey}
                onDeleteKey={handleDeleteApiKey}
                onRegenerateKey={handleRegenerateApiKey}
                availableRoles={getAvailableRoles()}
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
