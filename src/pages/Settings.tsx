import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import AuthenticationCard from '@/components/auth/AuthenticationCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import KYCSettingsForm, { KYCField } from '@/components/identity/KYCSettingsForm';
import ApiKeyManagement, { ApiKey } from '@/components/identity/ApiKeyManagement';

const Settings = () => {
  const { toast } = useToast();
  
  const [authMethods, setAuthMethods] = useState([
    {
      id: 'email-password',
      name: 'Email & Password',
      description: 'Classic authentication with email and password',
      enabled: true,
      isRecommended: true
    },
    {
      id: 'google',
      name: 'Google',
      description: 'Allow users to sign in with their Google account',
      enabled: true
    },
    {
      id: 'apple',
      name: 'Apple',
      description: 'Allow users to sign in with their Apple account',
      enabled: false
    },
    {
      id: 'microsoft',
      name: 'Microsoft',
      description: 'Allow users to sign in with their Microsoft account',
      enabled: false
    },
    {
      id: 'two-factor',
      name: 'Two-Factor Authentication',
      description: 'Require users to provide a second form of identification',
      enabled: true,
      isRecommended: true
    }
  ]);

  const [securitySettings, setSecuritySettings] = useState({
    lockoutEnabled: true,
    maximumAttempts: 5,
    lockoutDuration: 30,
    passwordExpiration: 90,
    requireStrongPasswords: true,
    sessionTimeout: 60
  });

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

  const [roles, setRoles] = useState([
    { id: 'role_1', name: 'Admin' },
    { id: 'role_2', name: 'Manager' },
    { id: 'role_3', name: 'Reader' }
  ]);

  const handleAuthToggle = (id: string, enabled: boolean) => {
    setAuthMethods(prev =>
      prev.map(method => 
        method.id === id ? { ...method, enabled } : method
      )
    );

    toast({
      title: `${enabled ? 'Enabled' : 'Disabled'} ${id} authentication`,
      description: `The ${id} authentication method has been ${enabled ? 'enabled' : 'disabled'}.`,
    });
  };

  const handleSecurityToggle = (key: keyof typeof securitySettings, value: boolean) => {
    setSecuritySettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSecuritySave = () => {
    toast({
      title: "Settings saved",
      description: "Your security settings have been updated.",
    });
  };

  const handleSaveKYCSettings = (fields: KYCField[]) => {
    setKycFields(fields);
    toast({
      title: "KYC settings saved",
      description: "Your KYC field settings have been updated.",
    });
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
    toast({
      title: "API key deleted",
      description: "The API key has been permanently deleted",
    });
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
    toast({
      title: "API key regenerated",
      description: "The new API key has been created and the old one is now invalid",
    });
  };

  const getAvailableRoles = () => roles.map(role => ({ id: role.id, name: role.name }));

  console.log("Rendering Settings page with tabs");

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight pb-1">Settings</h1>
          <p className="text-muted-foreground">
            Configure authentication, security, and identity settings
          </p>
        </div>

        <Tabs defaultValue="authentication" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
            <TabsTrigger value="authentication">Authentication</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="kyc">KYC Settings</TabsTrigger>
            <TabsTrigger value="apikeys">API Keys</TabsTrigger>
          </TabsList>
          
          <TabsContent value="authentication" className="space-y-4 animate-fade-in">
            <AuthenticationCard 
              methods={authMethods}
              onToggle={handleAuthToggle}
            />
          </TabsContent>
          
          <TabsContent value="security" className="space-y-4 animate-fade-in">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Security Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6">
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h3 className="text-sm font-medium">Account Lockout</h3>
                        <p className="text-sm text-muted-foreground">
                          Lock accounts after failed login attempts
                        </p>
                      </div>
                      <Switch 
                        checked={securitySettings.lockoutEnabled}
                        onCheckedChange={(checked) => 
                          handleSecurityToggle('lockoutEnabled', checked)
                        }
                      />
                    </div>
                    
                    {securitySettings.lockoutEnabled && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-2 border-l-2 border-muted ml-2 animate-fade-in">
                        <div className="space-y-2">
                          <Label htmlFor="maximumAttempts">Maximum attempts</Label>
                          <Input 
                            id="maximumAttempts"
                            type="number" 
                            value={securitySettings.maximumAttempts}
                            onChange={(e) => setSecuritySettings(prev => ({
                              ...prev,
                              maximumAttempts: parseInt(e.target.value)
                            }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lockoutDuration">Lockout duration (minutes)</Label>
                          <Input 
                            id="lockoutDuration"
                            type="number" 
                            value={securitySettings.lockoutDuration}
                            onChange={(e) => setSecuritySettings(prev => ({
                              ...prev,
                              lockoutDuration: parseInt(e.target.value)
                            }))}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h3 className="text-sm font-medium">Strong Passwords</h3>
                      <p className="text-sm text-muted-foreground">
                        Require passwords to meet complexity requirements
                      </p>
                    </div>
                    <Switch 
                      checked={securitySettings.requireStrongPasswords}
                      onCheckedChange={(checked) => 
                        handleSecurityToggle('requireStrongPasswords', checked)
                      }
                    />
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="passwordExpiration">Password expiration (days)</Label>
                    <Input 
                      id="passwordExpiration"
                      type="number" 
                      value={securitySettings.passwordExpiration}
                      onChange={(e) => setSecuritySettings(prev => ({
                        ...prev,
                        passwordExpiration: parseInt(e.target.value)
                      }))}
                    />
                    <p className="text-xs text-muted-foreground">
                      Set to 0 to disable password expiration
                    </p>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">Session timeout (minutes)</Label>
                    <Input 
                      id="sessionTimeout"
                      type="number" 
                      value={securitySettings.sessionTimeout}
                      onChange={(e) => setSecuritySettings(prev => ({
                        ...prev,
                        sessionTimeout: parseInt(e.target.value)
                      }))}
                    />
                    <p className="text-xs text-muted-foreground">
                      Automatically log out inactive users
                    </p>
                  </div>

                  <Button onClick={handleSecuritySave}>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="kyc" className="space-y-4 animate-fade-in">
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
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
