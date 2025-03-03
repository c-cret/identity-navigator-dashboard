
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle, 
  XCircle, 
  FileCheck, 
  ShieldAlert,
  Clock,
  ArrowLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import type { Identity, IdentityState } from './IdentityList';

interface IdentityDetailsProps {
  identity: Identity;
  onBack: () => void;
  onUpdateState: (identity: Identity, newState: IdentityState) => void;
}

const IdentityDetails = ({ identity, onBack, onUpdateState }: IdentityDetailsProps) => {
  const getStateColor = (state: IdentityState) => {
    switch (state) {
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

  const getStateIcon = (state: IdentityState) => {
    switch (state) {
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

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack} className="p-0 h-9 w-9">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-semibold">Identity Details</h2>
        <div className="ml-auto">
          <Badge 
            variant="secondary"
            className={cn(
              "flex items-center justify-center h-6 px-3",
              getStateColor(identity.state)
            )}
          >
            {getStateIcon(identity.state)}
            {identity.state.charAt(0).toUpperCase() + identity.state.slice(1)}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">First Name</h3>
                <p className="text-base">{identity.firstName}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Last Name</h3>
                <p className="text-base">{identity.lastName}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                <p className="text-base">{identity.email}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Identity Number</h3>
                <p className="text-base">{identity.identityNumber}</p>
              </div>
              {identity.address && (
                <div className="col-span-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Address</h3>
                  <p className="text-base">{identity.address}</p>
                </div>
              )}
            </div>

            {identity.additionalFields && Object.keys(identity.additionalFields).length > 0 && (
              <>
                <Separator />
                <div>
                  <h3 className="text-sm font-medium mb-3">Additional Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.entries(identity.additionalFields).map(([key, value]) => (
                      <div key={key}>
                        <h4 className="text-sm font-medium text-muted-foreground">
                          {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                        </h4>
                        <p className="text-base">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Profile Picture</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            {identity.profilePicture ? (
              <div className="w-full aspect-square rounded-md overflow-hidden border border-border">
                <img 
                  src={identity.profilePicture} 
                  alt={`${identity.firstName} ${identity.lastName}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-full aspect-square rounded-md bg-muted flex items-center justify-center">
                <span className="text-2xl font-medium">
                  {identity.firstName.charAt(0).toUpperCase()}
                  {identity.lastName.charAt(0).toUpperCase()}
                </span>
              </div>
            )}

            <div className="w-full mt-6 space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground">Actions</h3>
              
              <div className="grid grid-cols-1 gap-2">
                {identity.state !== 'approved' && (
                  <Button 
                    onClick={() => onUpdateState(identity, 'approved')}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Approve
                  </Button>
                )}
                
                {identity.state !== 'rejected' && (
                  <Button 
                    onClick={() => onUpdateState(identity, 'rejected')}
                    variant="destructive"
                    className="w-full"
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Reject
                  </Button>
                )}
                
                {identity.state !== 'obsoleted' && (
                  <Button 
                    onClick={() => onUpdateState(identity, 'obsoleted')}
                    variant="outline"
                    className="w-full"
                  >
                    <FileCheck className="mr-2 h-4 w-4" />
                    Mark as Obsolete
                  </Button>
                )}
                
                {identity.state !== 'compromised' && (
                  <Button 
                    onClick={() => onUpdateState(identity, 'compromised')}
                    variant="secondary"
                    className="w-full text-purple-600 dark:text-purple-400"
                  >
                    <ShieldAlert className="mr-2 h-4 w-4" />
                    Mark as Compromised
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IdentityDetails;
