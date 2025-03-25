
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
  Clock,
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
    application.identityNumber.toLowerCase().includes(searchTerm.toLowerCase())
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
              <TableHead>Identity Number</TableHead>
              <TableHead className="hidden md:table-cell">Submitted</TableHead>
              <TableHead className="w-[200px] text-right">Actions</TableHead>
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
                    {application.identityNumber}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                      {formatDate(application.createdAt)}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onView(application)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-green-100 text-green-700 hover:bg-green-200 hover:text-green-800 border-green-200"
                        onClick={() => onApprove(application)}
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-red-100 text-red-700 hover:bg-red-200 hover:text-red-800 border-red-200"
                        onClick={() => onReject(application)}
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
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
