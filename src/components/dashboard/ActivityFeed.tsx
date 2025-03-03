
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

type ActivityType = 'login' | 'signup' | 'permission' | 'settings';

interface ActivityItem {
  id: string;
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
  type: ActivityType;
  action: string;
  timestamp: Date;
}

const getActivityTypeColor = (type: ActivityType) => {
  switch (type) {
    case 'login':
      return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
    case 'signup':
      return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
    case 'permission':
      return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
    case 'settings':
      return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
    default:
      return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
  }
};

const formatTimeAgo = (date: Date) => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return 'just now';
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays}d ago`;
  }
  
  return date.toLocaleDateString();
};

interface ActivityFeedProps {
  activities: ActivityItem[];
  className?: string;
}

const ActivityFeed = ({ activities, className }: ActivityFeedProps) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-3">
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-0">
          {activities.map((activity, index) => (
            <div
              key={activity.id}
              className={cn(
                "flex items-start p-4 transition-colors hover:bg-muted/50",
                index !== activities.length - 1 && "border-b"
              )}
              style={{ 
                animationDelay: `${index * 50}ms`
              }}
            >
              {activity.user.avatar ? (
                <div className="w-9 h-9 rounded-full overflow-hidden mr-3 border border-border/50 flex-shrink-0">
                  <img 
                    src={activity.user.avatar} 
                    alt={activity.user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3 flex-shrink-0">
                  {activity.user.name.charAt(0).toUpperCase()}
                </div>
              )}
              
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1 gap-1">
                  <p className="text-sm font-medium truncate">
                    {activity.user.name}
                  </p>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {formatTimeAgo(activity.timestamp)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-1.5">
                  {activity.action}
                </p>
                <Badge 
                  variant="secondary"
                  className={cn(
                    "text-xs font-normal",
                    getActivityTypeColor(activity.type)
                  )}
                >
                  {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityFeed;
