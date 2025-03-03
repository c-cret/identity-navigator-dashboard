
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  Copy, 
  Eye, 
  EyeOff, 
  Key, 
  MoreHorizontal, 
  RefreshCw, 
  Trash2 
} from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

export interface ApiKey {
  id: string;
  name: string;
  key: string;
  role: string;
  createdAt: Date;
  lastUsed?: Date;
}

interface ApiKeyManagementProps {
  apiKeys: ApiKey[];
  onCreateKey: (name: string, role: string) => void;
  onDeleteKey: (id: string) => void;
  onRegenerateKey: (id: string) => void;
  availableRoles: { id: string, name: string }[];
}

const ApiKeyManagement = ({ 
  apiKeys, 
  onCreateKey, 
  onDeleteKey, 
  onRegenerateKey,
  availableRoles
}: ApiKeyManagementProps) => {
  const { toast } = useToast();
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyRole, setNewKeyRole] = useState(availableRoles[0]?.id || '');
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [keyToDelete, setKeyToDelete] = useState<ApiKey | null>(null);
  const [visibleKeys, setVisibleKeys] = useState<string[]>([]);

  const handleCreateKey = () => {
    if (!newKeyName.trim()) {
      toast({
        title: "Key name required",
        description: "Please enter a name for the new API key",
        variant: "destructive",
      });
      return;
    }

    onCreateKey(newKeyName.trim(), newKeyRole);
    setNewKeyName('');
  };

  const confirmDelete = (key: ApiKey) => {
    setKeyToDelete(key);
    setShowConfirmDelete(true);
  };

  const handleDelete = () => {
    if (keyToDelete) {
      onDeleteKey(keyToDelete.id);
      setShowConfirmDelete(false);
      setKeyToDelete(null);
    }
  };

  const handleRegenerateKey = (id: string) => {
    onRegenerateKey(id);
    toast({
      title: "API key regenerated",
      description: "The new API key has been created and the old one is now invalid",
    });
  };

  const toggleKeyVisibility = (id: string) => {
    setVisibleKeys(prev => 
      prev.includes(id) 
        ? prev.filter(keyId => keyId !== id)
        : [...prev, id]
    );
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "API key has been copied to your clipboard",
    });
  };

  const formatDate = (date?: Date) => {
    if (!date) return "Never";
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  const maskApiKey = (key: string, visible: boolean) => {
    if (visible) return key;
    return `${key.slice(0, 6)}...${key.slice(-4)}`;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>API Keys</CardTitle>
          <CardDescription>
            Manage API keys for accessing the identity verification system
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="rounded-md border overflow-hidden">
            <Table className="w-full">
              <TableHeader className="bg-muted/30">
                <TableRow>
                  <TableHead className="w-[250px]">Key Name</TableHead>
                  <TableHead>API Key</TableHead>
                  <TableHead className="hidden md:table-cell">Role</TableHead>
                  <TableHead className="hidden md:table-cell">Created</TableHead>
                  <TableHead className="hidden md:table-cell">Last Used</TableHead>
                  <TableHead className="w-[50px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {apiKeys.length > 0 ? (
                  apiKeys.map((key, index) => (
                    <TableRow 
                      key={key.id}
                      className="transition-colors hover:bg-muted/50 animate-slide-in-bottom"
                      style={{ animationDelay: `${index * 30}ms` }}
                    >
                      <TableCell>
                        <div className="font-medium">{key.name}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <code className="px-2 py-1 bg-muted rounded text-xs font-mono">
                            {maskApiKey(key.key, visibleKeys.includes(key.id))}
                          </code>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => toggleKeyVisibility(key.id)}
                          >
                            {visibleKeys.includes(key.id) ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => copyToClipboard(key.key)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge variant="outline" className="bg-muted/50">
                          {key.role}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground">
                        {formatDate(key.createdAt)}
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground">
                        {formatDate(key.lastUsed)}
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
                            <DropdownMenuItem onClick={() => handleRegenerateKey(key.id)}>
                              <RefreshCw className="mr-2 h-4 w-4" />
                              Regenerate
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={() => confirmDelete(key)}
                              className="text-red-600 dark:text-red-400"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete key
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No API keys found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <Separator />

          <div>
            <h3 className="font-medium mb-3">Create New API Key</h3>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="sm:col-span-2">
                <Label htmlFor="new-key-name" className="text-sm">Key Name</Label>
                <Input 
                  id="new-key-name"
                  placeholder="e.g. Production API Key"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="new-key-role" className="text-sm">Role</Label>
                <select 
                  id="new-key-role"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={newKeyRole}
                  onChange={(e) => setNewKeyRole(e.target.value)}
                >
                  {availableRoles.map(role => (
                    <option key={role.id} value={role.id}>{role.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-end">
                <Button onClick={handleCreateKey} className="w-full">
                  <Key className="mr-2 h-4 w-4" />
                  Generate Key
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showConfirmDelete} onOpenChange={setShowConfirmDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete API Key</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the API key "{keyToDelete?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDelete(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ApiKeyManagement;
