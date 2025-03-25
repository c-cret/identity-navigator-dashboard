
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { Calendar, Clock, FileText, User, MapPin, Monitor } from 'lucide-react';
import type { Account, ActivityItem } from '@/types/account';

interface AccountHistoryProps {
  account: Account;
  activities: ActivityItem[];
}

const AccountHistory = ({ account, activities }: AccountHistoryProps) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(date);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'login':
        return <Monitor className="h-4 w-4 text-blue-500" />;
      case 'contract':
        return <FileText className="h-4 w-4 text-green-500" />;
      case 'identity':
        return <User className="h-4 w-4 text-purple-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'login':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'contract':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'identity':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  // Filter activities by type
  const loginActivities = activities.filter(act => act.type === 'login');
  const contractActivities = activities.filter(act => act.type === 'contract');
  const identityActivities = activities.filter(act => act.type === 'identity');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Account History</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Activity</TabsTrigger>
            <TabsTrigger value="logins">Logins</TabsTrigger>
            <TabsTrigger value="contracts">Contracts</TabsTrigger>
            <TabsTrigger value="identity">Identity</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {activities.length > 0 ? (
              <div className="space-y-4">
                {activities.map((activity) => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground py-4 text-center">No activity found</p>
            )}
          </TabsContent>

          <TabsContent value="logins" className="space-y-4">
            {loginActivities.length > 0 ? (
              <div className="space-y-4">
                {loginActivities.map((activity) => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground py-4 text-center">No login activity found</p>
            )}
          </TabsContent>

          <TabsContent value="contracts" className="space-y-4">
            {contractActivities.length > 0 ? (
              <div className="space-y-4">
                {contractActivities.map((activity) => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground py-4 text-center">No contract activity found</p>
            )}
          </TabsContent>

          <TabsContent value="identity" className="space-y-4">
            {identityActivities.length > 0 ? (
              <div className="space-y-4">
                {identityActivities.map((activity) => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground py-4 text-center">No identity activity found</p>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

// Activity item component
const ActivityItem = ({ activity }: { activity: ActivityItem }) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(date);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'login':
        return <Monitor className="h-4 w-4" />;
      case 'contract':
        return <FileText className="h-4 w-4" />;
      case 'identity':
        return <User className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'login':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'contract':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'identity':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  return (
    <div className="flex items-start p-4 border rounded-lg">
      <div className="mr-4">
        <div className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center",
          "bg-muted"
        )}>
          {getActivityIcon(activity.type)}
        </div>
      </div>
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <h3 className="font-medium">{activity.description}</h3>
            <Badge 
              variant="secondary"
              className={cn(
                "text-xs font-normal",
                getActivityColor(activity.type)
              )}
            >
              {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
            </Badge>
          </div>
          <div className="text-sm text-muted-foreground">
            <Calendar className="inline-block w-3 h-3 mr-1" />
            {formatDate(activity.timestamp)}
          </div>
        </div>
        
        <div className="text-sm text-muted-foreground flex flex-col sm:flex-row gap-4">
          {activity.ipAddress && (
            <div>
              <MapPin className="inline-block w-3 h-3 mr-1" />
              IP: {activity.ipAddress}
            </div>
          )}
          {activity.device && (
            <div>
              <Monitor className="inline-block w-3 h-3 mr-1" />
              {activity.device}
            </div>
          )}
          {activity.documentId && (
            <div>
              <FileText className="inline-block w-3 h-3 mr-1" />
              Document ID: {activity.documentId}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountHistory;
