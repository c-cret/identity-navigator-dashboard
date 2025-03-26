
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
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { 
  MoreVertical,
  Search,
  CheckCircle,
  XCircle,
  Eye
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Identity } from '@/types/account';

interface IdentityApplicationsListProps {
  applications: Identity[];
  onView: (identity: Identity) => void;
  onApprove: (identity: Identity) => void;
  onReject: (identity: Identity) => void;
  className?: string;
}

const IdentityApplicationsList = ({ 
  applications, 
  onView, 
  onApprove, 
  onReject, 
  className 
}: IdentityApplicationsListProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredApplications = applications.filter(application => 
    `${application.firstName} ${application.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    application.identityNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (application.email && application.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (application.phone && application.phone.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const formatDate = (date: Date) => {
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
            placeholder="Search applications..."
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
              <TableHead className="w-[250px]">Applicant</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead className="w-[100px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredApplications.length > 0 ? (
              filteredApplications.map((application, index) => (
                <TableRow 
                  key={application.id}
                  className="transition-colors hover:bg-muted/50 animate-slide-in-bottom"
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div>
                        <div className="font-medium">{application.firstName} {application.lastName}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {application.email || "-"}
                  </TableCell>
                  <TableCell>
                    {application.phone || "-"}
                  </TableCell>
                  <TableCell>
                    {formatDate(application.createdAt)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onView(application)}
                        className="h-8 w-8"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem 
                            onClick={() => onApprove(application)}
                            className="text-green-600 cursor-pointer"
                          >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Approve
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => onReject(application)}
                            className="text-red-600 cursor-pointer"
                          >
                            <XCircle className="mr-2 h-4 w-4" />
                            Reject
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No pending applications found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default IdentityApplicationsList;
