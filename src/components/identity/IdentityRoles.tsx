
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
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Check, Edit, MoreHorizontal, Plus, Trash2, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';

export interface Permission {
  id: string;
  name: string;
  description: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  isDefault?: boolean;
  isSystem?: boolean;
}

interface IdentityRolesProps {
  roles: Role[];
  permissions: Permission[];
  onCreateRole: (role: Omit<Role, 'id'>) => void;
  onUpdateRole: (id: string, role: Partial<Role>) => void;
  onDeleteRole: (id: string) => void;
}

const IdentityRoles = ({ 
  roles, 
  permissions, 
  onCreateRole, 
  onUpdateRole, 
  onDeleteRole 
}: IdentityRolesProps) => {
  const { toast } = useToast();
  const [showRoleDialog, setShowRoleDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [roleToDelete, setRoleToDelete] = useState<Role | null>(null);

  const [roleName, setRoleName] = useState('');
  const [roleDescription, setRoleDescription] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const openCreateDialog = () => {
    setEditingRole(null);
    setRoleName('');
    setRoleDescription('');
    setSelectedPermissions([]);
    setShowRoleDialog(true);
  };

  const openEditDialog = (role: Role) => {
    setEditingRole(role);
    setRoleName(role.name);
    setRoleDescription(role.description);
    setSelectedPermissions([...role.permissions]);
    setShowRoleDialog(true);
  };

  const confirmDelete = (role: Role) => {
    setRoleToDelete(role);
    setShowDeleteDialog(true);
  };

  const handlePermissionToggle = (permissionId: string) => {
    setSelectedPermissions(prev => 
      prev.includes(permissionId)
        ? prev.filter(id => id !== permissionId)
        : [...prev, permissionId]
    );
  };

  const handleSaveRole = () => {
    if (!roleName.trim()) {
      toast({
        title: "Role name required",
        description: "Please enter a name for the role",
        variant: "destructive",
      });
      return;
    }

    if (editingRole) {
      onUpdateRole(editingRole.id, {
        name: roleName.trim(),
        description: roleDescription.trim(),
        permissions: selectedPermissions,
      });
      
      toast({
        title: "Role updated",
        description: `The role "${roleName}" has been updated`,
      });
    } else {
      onCreateRole({
        name: roleName.trim(),
        description: roleDescription.trim(),
        permissions: selectedPermissions,
      });
      
      toast({
        title: "Role created",
        description: `The role "${roleName}" has been created`,
      });
    }

    setShowRoleDialog(false);
  };

  const handleDeleteRole = () => {
    if (roleToDelete) {
      onDeleteRole(roleToDelete.id);
      setShowDeleteDialog(false);
      setRoleToDelete(null);
      
      toast({
        title: "Role deleted",
        description: `The role "${roleToDelete.name}" has been deleted`,
      });
    }
  };

  const getPermissionName = (id: string) => {
    return permissions.find(p => p.id === id)?.name || id;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Identity Roles</CardTitle>
            <CardDescription>
              Manage roles and permissions for identity verification system
            </CardDescription>
          </div>
          <Button onClick={openCreateDialog}>
            <Plus className="mr-2 h-4 w-4" />
            New Role
          </Button>
        </CardHeader>
        <CardContent className="p-6">
          <div className="rounded-md border overflow-hidden">
            <Table className="w-full">
              <TableHeader className="bg-muted/30">
                <TableRow>
                  <TableHead className="w-[250px]">Role</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="hidden md:table-cell">Permissions</TableHead>
                  <TableHead className="w-[50px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {roles.length > 0 ? (
                  roles.map((role, index) => (
                    <TableRow 
                      key={role.id}
                      className="transition-colors hover:bg-muted/50 animate-slide-in-bottom"
                      style={{ animationDelay: `${index * 30}ms` }}
                    >
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{role.name}</span>
                          {role.isSystem && (
                            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                              System
                            </Badge>
                          )}
                          {role.isDefault && (
                            <Badge variant="secondary" className="bg-green-100 text-green-700">
                              Default
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-muted-foreground">
                          {role.description}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {role.permissions.slice(0, 3).map(permId => (
                            <Badge key={permId} variant="outline" className="bg-muted/50">
                              {getPermissionName(permId)}
                            </Badge>
                          ))}
                          {role.permissions.length > 3 && (
                            <Badge variant="outline">
                              +{role.permissions.length - 3} more
                            </Badge>
                          )}
                        </div>
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
                            <DropdownMenuItem 
                              onClick={() => openEditDialog(role)}
                              disabled={role.isSystem}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit role
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={() => confirmDelete(role)}
                              className="text-red-600 dark:text-red-400"
                              disabled={role.isSystem}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete role
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                      No roles found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showRoleDialog} onOpenChange={setShowRoleDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editingRole ? 'Edit Role' : 'Create New Role'}</DialogTitle>
            <DialogDescription>
              {editingRole 
                ? 'Update the role details and permissions' 
                : 'Define a new role with specific permissions'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div>
              <label htmlFor="roleName" className="text-sm font-medium mb-1.5 block">
                Role Name
              </label>
              <Input
                id="roleName"
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
                placeholder="e.g. API User"
              />
            </div>
            
            <div>
              <label htmlFor="roleDescription" className="text-sm font-medium mb-1.5 block">
                Description
              </label>
              <Input
                id="roleDescription"
                value={roleDescription}
                onChange={(e) => setRoleDescription(e.target.value)}
                placeholder="Role description..."
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1.5 block">
                Permissions
              </label>
              <div className="max-h-[200px] overflow-y-auto border rounded-md p-2">
                {permissions.map(permission => (
                  <div key={permission.id} className="flex items-center mb-2 last:mb-0">
                    <Button
                      variant="outline"
                      size="sm"
                      className={`w-6 h-6 mr-2 p-0 ${
                        selectedPermissions.includes(permission.id)
                          ? 'bg-primary text-primary-foreground'
                          : ''
                      }`}
                      onClick={() => handlePermissionToggle(permission.id)}
                    >
                      {selectedPermissions.includes(permission.id) ? (
                        <Check className="h-3 w-3" />
                      ) : (
                        <span></span>
                      )}
                    </Button>
                    <div>
                      <div className="font-medium text-sm">{permission.name}</div>
                      <div className="text-xs text-muted-foreground">{permission.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRoleDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveRole}>
              {editingRole ? 'Update Role' : 'Create Role'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Role</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the role "{roleToDelete?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteRole}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IdentityRoles;
