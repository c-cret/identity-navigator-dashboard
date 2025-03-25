
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Edit, Save } from 'lucide-react';
import type { Account } from '@/types/account';

interface AccountInfoProps {
  account: Account;
  onUpdateAccount: (updatedAccount: Partial<Account>) => void;
}

const AccountInfo = ({ account, onUpdateAccount }: AccountInfoProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: account.name,
    email: account.email,
    phoneNumber: account.phoneNumber
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateAccount(formData);
    setIsEditing(false);
  };

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
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl">Account Information</CardTitle>
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
          View and manage account details
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
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
              {isEditing ? (
                <Input 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                />
              ) : (
                <div className="p-2 border rounded-md bg-muted/20">{account.name}</div>
              )}
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="email">Email Address</Label>
              {isEditing ? (
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                />
              ) : (
                <div className="p-2 border rounded-md bg-muted/20">{account.email}</div>
              )}
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              {isEditing ? (
                <Input 
                  id="phoneNumber" 
                  name="phoneNumber" 
                  value={formData.phoneNumber} 
                  onChange={handleChange} 
                />
              ) : (
                <div className="p-2 border rounded-md bg-muted/20">{account.phoneNumber}</div>
              )}
            </div>
          </div>
          
          {isEditing && (
            <Button type="submit">Save Changes</Button>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default AccountInfo;
