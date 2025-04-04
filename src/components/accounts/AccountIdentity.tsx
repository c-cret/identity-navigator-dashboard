
import React from 'react';
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
  UserPlus,
  AlertTriangle,
  History
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Account, Identity, OldIdentity } from '@/types/account';

interface AccountIdentityProps {
  identity?: Identity;
  account: Account;
  oldIdentities?: OldIdentity[];
  onUpdateIdentity: (updatedIdentity: Partial<Identity>) => void;
  onCreateIdentity: () => void;
}

const AccountIdentity = ({ identity, account, oldIdentities = [], onUpdateIdentity, onCreateIdentity }: AccountIdentityProps) => {
  const handleStateChange = (newState: string) => {
    onUpdateIdentity({ state: newState as any });
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
    <div className="space-y-4">
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
          </div>
          <CardDescription>
            View and manage identity verification details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="pb-4 mb-4 border-b">
              <p className="text-sm text-muted-foreground">
                Identity created on {formatDate(identity.createdAt)}
              </p>
            </div>
            
            <div className="grid gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <div className="p-2 border rounded-md bg-muted/20">{identity.firstName}</div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <div className="p-2 border rounded-md bg-muted/20">{identity.lastName}</div>
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="identityNumber">Identity Number</Label>
                <div className="p-2 border rounded-md bg-muted/20">{identity.identityNumber}</div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <div className="p-2 border rounded-md bg-muted/20 min-h-[80px]">{identity.address}</div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="state">Identity Status</Label>
                <div className="p-2 border rounded-md bg-muted/20 flex items-center">
                  {getStatusIcon(identity.state)}
                  {identity.state.charAt(0).toUpperCase() + identity.state.slice(1)}
                </div>
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
            
            <div className="space-y-3 mt-8">
              <h3 className="font-medium">Identity Actions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {identity.state !== 'approved' && (
                  <Button 
                    onClick={() => handleStateChange('approved')}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Approve Identity
                  </Button>
                )}
                
                {identity.state !== 'rejected' && (
                  <Button 
                    onClick={() => handleStateChange('rejected')}
                    variant="destructive"
                    className="w-full"
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Reject Identity
                  </Button>
                )}
                
                {identity.state !== 'obsoleted' && (
                  <Button 
                    onClick={() => handleStateChange('obsoleted')}
                    variant="outline"
                    className="w-full"
                  >
                    <FileCheck className="mr-2 h-4 w-4" />
                    Mark as Obsolete
                  </Button>
                )}
                
                {identity.state !== 'compromised' && (
                  <Button 
                    onClick={() => handleStateChange('compromised')}
                    variant="secondary"
                    className="w-full text-purple-600 dark:text-purple-400"
                  >
                    <ShieldAlert className="mr-2 h-4 w-4" />
                    Mark as Compromised
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {oldIdentities.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="w-5 h-5" />
              Identity History
            </CardTitle>
            <CardDescription>
              Previous identity records for this account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {oldIdentities.map((oldIdentity) => (
                <div key={oldIdentity.id} className="p-4 border rounded-md">
                  <div className="flex flex-col sm:flex-row sm:justify-between mb-4">
                    <div>
                      <Badge 
                        variant="secondary"
                        className={cn(
                          "flex items-center h-6",
                          getStatusColor(oldIdentity.state)
                        )}
                      >
                        {getStatusIcon(oldIdentity.state)}
                        {oldIdentity.state.charAt(0).toUpperCase() + oldIdentity.state.slice(1)}
                      </Badge>
                    </div>
                    <div className="mt-2 sm:mt-0 text-sm text-muted-foreground">
                      Active: {formatDate(oldIdentity.createdAt)} - {formatDate(oldIdentity.expiredAt)}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">First Name</p>
                      <p>{oldIdentity.firstName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Last Name</p>
                      <p>{oldIdentity.lastName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Identity Number</p>
                      <p>{oldIdentity.identityNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Reason for Change</p>
                      <p>{oldIdentity.reason}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AccountIdentity;
