
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  Clock, 
  XCircle, 
  FileCheck, 
  ShieldAlert,
  Edit,
  Save,
  UserPlus,
  AlertTriangle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Account, Identity } from '@/types/account';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface AccountIdentityProps {
  identity?: Identity;
  account: Account;
  onUpdateIdentity: (updatedIdentity: Partial<Identity>) => void;
  onCreateIdentity: () => void;
}

const AccountIdentity = ({ identity, account, onUpdateIdentity, onCreateIdentity }: AccountIdentityProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(identity ? {
    firstName: identity.firstName,
    lastName: identity.lastName,
    identityNumber: identity.identityNumber,
    address: identity.address || '',
    state: identity.state,
  } : {
    firstName: '',
    lastName: '',
    identityNumber: '',
    address: '',
    state: 'pending' as const,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStateChange = (value: string) => {
    setFormData(prev => ({ ...prev, state: value as any }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateIdentity(formData);
    setIsEditing(false);
  };

  const handleCreateIdentity = () => {
    onCreateIdentity();
  };

  const formatDate = (date?: Date) => {
    if (!date) return 'Unknown';
    
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(date);
  };

  const getStatusColor = (status?: string) => {
    if (!status) return '';
    
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'pending':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
      case 'rejected':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      case 'obsoleted':
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
      case 'compromised':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
      default:
        return '';
    }
  };

  const getStatusIcon = (status?: string) => {
    if (!status) return null;
    
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4 mr-2" />;
      case 'pending':
        return <Clock className="w-4 h-4 mr-2" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 mr-2" />;
      case 'obsoleted':
        return <FileCheck className="w-4 h-4 mr-2" />;
      case 'compromised':
        return <ShieldAlert className="w-4 h-4 mr-2" />;
      default:
        return null;
    }
  };

  if (!identity) {
    return (
      <Card className="flex flex-col items-center justify-center py-12">
        <AlertTriangle className="w-12 h-12 text-amber-500 mb-4" />
        <CardTitle className="text-xl mb-2">No Identity Found</CardTitle>
        <CardDescription className="text-center max-w-md mb-6">
          This account doesn't have an identity verification yet. 
          You can create a new identity verification for this account.
        </CardDescription>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="w-4 h-4 mr-2" />
              Create Identity
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Identity</DialogTitle>
              <DialogDescription>
                Create a new identity for {account.name}
              </DialogDescription>
            </DialogHeader>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" name="firstName" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" name="lastName" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="identityNumber">Identity Number</Label>
                <Input id="identityNumber" name="identityNumber" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" name="address" rows={3} />
              </div>
            </form>
            <DialogFooter>
              <Button onClick={handleCreateIdentity}>Create Identity</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CardTitle className="text-2xl">Identity Information</CardTitle>
            <Badge 
              variant="secondary"
              className={cn(
                "flex items-center h-7 px-3",
                getStatusColor(identity.state)
              )}
            >
              {getStatusIcon(identity.state)}
              {identity.state.charAt(0).toUpperCase() + identity.state.slice(1)}
            </Badge>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? (
              <>
                <Save className="h-4 w-4 mr-2" />
                Cancel
              </>
            ) : (
              <>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </>
            )}
          </Button>
        </div>
        <CardDescription>
          View and manage identity verification details
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="pb-4 mb-4 border-b">
            <p className="text-sm text-muted-foreground">
              Identity created on {formatDate(identity.createdAt)}
            </p>
          </div>
          
          <div className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="firstName">First Name</Label>
                {isEditing ? (
                  <Input 
                    id="firstName" 
                    name="firstName" 
                    value={formData.firstName} 
                    onChange={handleChange} 
                  />
                ) : (
                  <div className="p-2 border rounded-md bg-muted/20">{identity.firstName}</div>
                )}
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="lastName">Last Name</Label>
                {isEditing ? (
                  <Input 
                    id="lastName" 
                    name="lastName" 
                    value={formData.lastName} 
                    onChange={handleChange} 
                  />
                ) : (
                  <div className="p-2 border rounded-md bg-muted/20">{identity.lastName}</div>
                )}
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="identityNumber">Identity Number</Label>
              {isEditing ? (
                <Input 
                  id="identityNumber" 
                  name="identityNumber" 
                  value={formData.identityNumber} 
                  onChange={handleChange} 
                />
              ) : (
                <div className="p-2 border rounded-md bg-muted/20">{identity.identityNumber}</div>
              )}
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              {isEditing ? (
                <Textarea 
                  id="address" 
                  name="address" 
                  value={formData.address} 
                  onChange={handleChange} 
                  rows={3}
                />
              ) : (
                <div className="p-2 border rounded-md bg-muted/20 min-h-[80px]">{identity.address}</div>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="state">Identity Status</Label>
              {isEditing ? (
                <Select
                  value={formData.state}
                  onValueChange={handleStateChange}
                >
                  <SelectTrigger id="state">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="obsoleted">Obsoleted</SelectItem>
                    <SelectItem value="compromised">Compromised</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <div className="p-2 border rounded-md bg-muted/20 flex items-center">
                  {getStatusIcon(identity.state)}
                  {identity.state.charAt(0).toUpperCase() + identity.state.slice(1)}
                </div>
              )}
            </div>

            {identity.additionalFields && Object.entries(identity.additionalFields).length > 0 && (
              <div className="grid gap-4">
                <h3 className="font-medium text-sm">Additional Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(identity.additionalFields).map(([key, value]) => (
                    <div key={key} className="grid gap-2">
                      <Label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</Label>
                      <div className="p-2 border rounded-md bg-muted/20">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {isEditing && (
            <Button type="submit">Save Changes</Button>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default AccountIdentity;
