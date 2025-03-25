
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Account } from '@/types/account';

interface AccountInfoProps {
  account: Account;
}

const AccountInfo = ({ account }: AccountInfoProps) => {
  const formatDate = (date?: Date) => {
    if (!date) return 'Never';
    
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(date);
  };
  
  const getInitials = (name: string) => {
    return name.split(' ')
      .map(part => part.charAt(0).toUpperCase())
      .join('')
      .substring(0, 2);
  };

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Account Information</CardTitle>
        <CardDescription>
          View account details
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-6 mb-4 border-b">
            <Avatar className="h-16 w-16">
              <AvatarImage src={account.avatar} alt={account.name} />
              <AvatarFallback className="text-lg">
                {getInitials(account.name)}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h3 className="font-medium">{account.name}</h3>
              <p className="text-sm text-muted-foreground">
                Account created on {formatDate(account.createdAt)}
              </p>
              {account.lastLogin && (
                <p className="text-sm text-muted-foreground">
                  Last login: {formatDate(account.lastLogin)}
                </p>
              )}
            </div>
          </div>
          
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="p-2 border rounded-md bg-muted/20">{account.name}</div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="p-2 border rounded-md bg-muted/20">{account.email}</div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <div className="p-2 border rounded-md bg-muted/20">{account.phoneNumber}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountInfo;
