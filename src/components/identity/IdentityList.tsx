
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { 
  MoreHorizontal, 
  Search, 
  CheckCircle,
  XCircle,
  ShieldAlert,
  Clock,
  FileCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

export type IdentityState = 'approved' | 'pending' | 'rejected' | 'obsoleted' | 'compromised';

export interface Identity {
  id: string;
  firstName: string;
  lastName: string;
  identityNumber: string;
  email: string;
  state: IdentityState;
  address?: string;
  createdAt: Date;
  profilePicture?: string;
  additionalFields?: Record<string, string>;
}

interface IdentityListProps {
  identities: Identity[];
  onUpdateState: (identity: Identity, newState: IdentityState) => void;
  onView: (identity: Identity) => void;
  className?: string;
}

const IdentityList = ({ identities, onUpdateState, onView, className }: IdentityListProps) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredIdentities = identities.filter(identity => 
    identity.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    identity.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    identity.identityNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    identity.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        return <CheckCircle className="w-3.5 h-3.5 mr-1.5" />;
      case 'pending':
        return <Clock className="w-3.5 h-3.5 mr-1.5" />;
      case 'rejected':
        return <XCircle className="w-3.5 h-3.5 mr-1.5" />;
      case 'obsoleted':
        return <FileCheck className="w-3.5 h-3.5 mr-1.5" />;
      case 'compromised':
        return <ShieldAlert className="w-3.5 h-3.5 mr-1.5" />;
      default:
        return null;
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  const handleUpdateState = (identity: Identity, newState: IdentityState) => {
    onUpdateState(identity, newState);
    toast({
      title: `Identity state updated`,
      description: `${identity.firstName} ${identity.lastName}'s identity is now ${newState}`,
    });
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search identities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 w-full"
          />
        </div>
      </div>

      <div className="rounded-md border overflow-hidden">
        <Table className="w-full">
          <TableHeader className="bg-muted/30">
            <TableRow>
              <TableHead className="w-[250px]">Name</TableHead>
              <TableHead className="hidden md:table-cell">ID Number</TableHead>
              <TableHead className="hidden md:table-cell">State</TableHead>
              <TableHead className="hidden md:table-cell">Created</TableHead>
              <TableHead className="w-[50px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredIdentities.length > 0 ? (
              filteredIdentities.map((identity, index) => (
                <TableRow 
                  key={identity.id}
                  className="transition-colors hover:bg-muted/50 animate-slide-in-bottom"
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {identity.profilePicture ? (
                        <div className="w-8 h-8 rounded-full overflow-hidden border border-border/50">
                          <img 
                            src={identity.profilePicture} 
                            alt={`${identity.firstName} ${identity.lastName}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                          {identity.firstName.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <div className="font-medium">{identity.firstName} {identity.lastName}</div>
                        <div className="text-xs text-muted-foreground">{identity.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {identity.identityNumber}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge 
                      variant="secondary"
                      className={cn(
                        "flex items-center justify-center h-6",
                        getStateColor(identity.state)
                      )}
                    >
                      {getStateIcon(identity.state)}
                      {identity.state.charAt(0).toUpperCase() + identity.state.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">
                    {formatDate(identity.createdAt)}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[200px]">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => onView(identity)}>
                          View details
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Update State</DropdownMenuLabel>
                        {identity.state !== 'approved' && (
                          <DropdownMenuItem 
                            onClick={() => handleUpdateState(identity, 'approved')}
                            className="text-green-600 dark:text-green-400"
                          >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Approve
                          </DropdownMenuItem>
                        )}
                        {identity.state !== 'rejected' && (
                          <DropdownMenuItem 
                            onClick={() => handleUpdateState(identity, 'rejected')}
                            className="text-red-600 dark:text-red-400"
                          >
                            <XCircle className="mr-2 h-4 w-4" />
                            Reject
                          </DropdownMenuItem>
                        )}
                        {identity.state !== 'obsoleted' && (
                          <DropdownMenuItem 
                            onClick={() => handleUpdateState(identity, 'obsoleted')}
                          >
                            <FileCheck className="mr-2 h-4 w-4" />
                            Mark as Obsolete
                          </DropdownMenuItem>
                        )}
                        {identity.state !== 'compromised' && (
                          <DropdownMenuItem 
                            onClick={() => handleUpdateState(identity, 'compromised')}
                            className="text-purple-600 dark:text-purple-400"
                          >
                            <ShieldAlert className="mr-2 h-4 w-4" />
                            Mark as Compromised
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No identities found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default IdentityList;
