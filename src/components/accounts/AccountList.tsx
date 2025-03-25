
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
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { 
  MoreHorizontal, 
  Search,
  CheckCircle,
  XCircle,
  ShieldAlert,
  Clock,
  UserRound,
  BadgeCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Account } from '@/types/account';

interface AccountListProps {
  accounts: Account[];
  onView: (account: Account) => void;
  className?: string;
}

const AccountList = ({ accounts, onView, className }: AccountListProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAccounts = accounts.filter(account => 
    account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getIdentityStatusColor = (status?: string) => {
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

  const getIdentityStatusIcon = (status?: string) => {
    if (!status) return <UserRound className="w-3.5 h-3.5 mr-1.5" />;
    
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-3.5 h-3.5 mr-1.5" />;
      case 'pending':
        return <Clock className="w-3.5 h-3.5 mr-1.5" />;
      case 'rejected':
        return <XCircle className="w-3.5 h-3.5 mr-1.5" />;
      case 'obsoleted':
        return <BadgeCheck className="w-3.5 h-3.5 mr-1.5" />;
      case 'compromised':
        return <ShieldAlert className="w-3.5 h-3.5 mr-1.5" />;
      default:
        return null;
    }
  };

  const formatDate = (date?: Date) => {
    if (!date) return 'Never';
    
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search accounts..."
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
              <TableHead className="w-[250px]">Account</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead className="hidden md:table-cell">Phone</TableHead>
              <TableHead className="hidden md:table-cell">Identity Status</TableHead>
              <TableHead className="w-[50px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAccounts.length > 0 ? (
              filteredAccounts.map((account, index) => (
                <TableRow 
                  key={account.id}
                  className="transition-colors hover:bg-muted/50 animate-slide-in-bottom"
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {account.avatar ? (
                        <div className="w-8 h-8 rounded-full overflow-hidden border border-border/50">
                          <img 
                            src={account.avatar} 
                            alt={account.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                          {account.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <div className="font-medium">{account.name}</div>
                        <div className="text-xs text-muted-foreground md:hidden">{account.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {account.email}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {account.phoneNumber}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {account.hasIdentity ? (
                      <Badge 
                        variant="secondary"
                        className={cn(
                          "flex items-center justify-center h-6",
                          getIdentityStatusColor(account.identityStatus)
                        )}
                      >
                        {getIdentityStatusIcon(account.identityStatus)}
                        {account.identityStatus?.charAt(0).toUpperCase() + account.identityStatus?.slice(1) || 'None'}
                      </Badge>
                    ) : (
                      <Badge 
                        variant="outline"
                        className="flex items-center justify-center h-6"
                      >
                        <UserRound className="w-3.5 h-3.5 mr-1.5" />
                        No Identity
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[160px]">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => onView(account)}>
                          View details
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No accounts found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AccountList;
